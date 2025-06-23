    let currentPokemon = null;          // data의 값이 지정이 안됬음.

    // 숫자 랜덤 선택 
    function getRandomId() {
      return Math.floor(Math.random() * 1000) + 1;
    }

    // 포켓몬 정보 불러오기
    async function fetchPokemon(idOrName) {     // idOrName : 포켓몬의 번호 또는 이름
        try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);       // 인터넷에서 포켓몬 불러오기
        const data = await res.json();          // 읽어온 정보를 json으로 변환
        currentPokemon = {              // 아래 정보를 변수에 저장
            id: data.id,        // 번호
            name: data.name,    // 이름
            image: data.sprites.front_default       // 이미지가 있는 주소
        };
        document.getElementById('pokemon-name').textContent = data.name;        // 포켓몬 이름 보여주기
        document.getElementById('pokemon-image').src = data.sprites.front_default;      // 포켓몬 이미지 출력하기
        } catch (error) {                       // 만약에 인터넷 연결 x, 문제 있을 경우
        console.error("포켓몬 정보를 불러오지 못했습니다.", error);     // 에러메시지 출력
        alert("포켓몬 정보를 불러오지 못했습니다.");
        }
    }
    
    // 진화 포켓몬 불러오기
    async function evolvePokemon() {            // 포켓몬 진화
        if (!currentPokemon) return;            // 포켓몬 x -> 진화불가, 멈춰!

        try {
        // 포켓몬의 진화정보를 사이트에서 불러옴
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${currentPokemon.id}`);
        const speciesData = await speciesRes.json();  // 데이터를 불러옵니다.
        const evoChainUrl = speciesData.evolution_chain.url;       // 진화에 대한 상세주소 불러옴

        // 진화에 대한 실제 내용을 불러옴
        const evoRes = await fetch(evoChainUrl);
        const evoData = await evoRes.json();

        const chain = evoData.chain;
        
        // 포켓몬 진화 체인에서 진화된 포켓몬 찾기 피카츄면 -> 라이츄, 이상해씨면 -> 이상해풀 등등...
        function findNextEvolution(chainNode, currentName) {    // 현재 포켓몬 이름, 지금위치에 있을 경우
            if (chainNode.species.name === currentName) {       // 진화할 포켓몬이 있다면?
            if (chainNode.evolves_to.length > 0) {              
                return chainNode.evolves_to[0].species.name;    // 이름을 반환
            } else {                // 없다면?
                return null;           // null 반환
            }
            }
            for (const child of chainNode.evolves_to) {
            const result = findNextEvolution(child, currentName);   // 추가 진화가 있을 경우 계속 서칭
            if (result) return result;
            }
            return null;            // 없다면? null반환
        }
        // 현재 포켓문이 누구인지 확인, 다음 진화할 포켓몬을 찾아봐요~
        const nextEvolution = findNextEvolution(chain, currentPokemon.name);    
        if (nextEvolution) {    // 만약에 진화할 포켓몬이 있다면?
            fetchPokemon(nextEvolution);        // 바꿔줘요
        } else {        // 없다면?
            alert("더 이상 진화할 수 있는 포켓몬이 없습니다."); // 메세지 출력
        }
        } catch (error) {       // 진화 정보 불러오기 실패하거나, 문제 생길 경우
        console.error("진화 실패", error);
        alert("진화 정보를 불러오지 못했습니다.");      // 에러 메세지 반환
        }
    }

    function getRandomPokemon() {               // 랜덤번호로 포켓몬 뽑아서 정보불러오기
        const id = getRandomId();
        fetchPokemon(id);
    }

    document.addEventListener("DOMContentLoaded", () => {       // 화면이 나올때 실행되는 코드
    document.getElementById("random-button").addEventListener("click", getRandomPokemon);   // 랜덤버튼클릭 시
    document.getElementById("evolve-button").addEventListener("click", evolvePokemon);      // 진화버튼클릭시
    getRandomPokemon();  // 처음페이지가 뜰 경우, 포켓몬을 하나 랜덤 출력해서 보여줌. 
});