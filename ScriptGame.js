const tempat = document.querySelector(".tempat_main")
const player = document.querySelector(".player")
let score  = document.querySelector(".score")
let darah  = document.querySelector(".darah")


let posisi_palyer = 400
const batas = 1100
const ukuran_palyer = 50
let nilai = 0
let nilai_darah = 5

let isGameOver = false
document.addEventListener("keydown", (event) => {
    if (isGameOver) return
    
    const playerSpeed = 60
    if (event.key === "a") {
        posisi_palyer -= playerSpeed
    } else if (event.key === "d") {
        posisi_palyer += playerSpeed
    }
    // Batasi gerakan
    if (posisi_palyer < 400) {
        posisi_palyer = 400
    }
    if (posisi_palyer > batas - ukuran_palyer) {
        posisi_palyer = batas - ukuran_palyer
    }
    
    player.style.left = posisi_palyer + "px"
    
});
document.querySelector(".gas").addEventListener("click", jatuh)

function jatuh(){
    document.querySelector(".kalah").style.display = "none";
    score.textContent = `Score : 0`
    nilai = 0
    nilai_darah = 5
    const gas = document.querySelector(".gas")
    const bom = document.querySelector(".bom")
    const taco = document.querySelector(".taco")
    gas.style.display = "none"
    bom.style.display = "block"
    taco.style.display = "block"
    let posisi = 0;
    let posisiBom = 0;
    a = Math.random(Math.floor())*550
    b = Math.random(Math.floor())*550
    let loopnya = setInterval(() => {
        
        taco.style.marginLeft = `${400+a}px`
        bom.style.marginLeft = `${400+b}px`
        posisi += 5;  
        posisiBom += 7;  
        taco.style.top = `${posisi}px`
        bom.style.top = `${posisiBom}px`
        
        if (posisi >= 690) {
            posisi = 0;
            nilai_darah -= 1
            darah.textContent = `Live : ${nilai_darah}`
            a = Math.random(Math.floor())*550
        }
        if (posisiBom >=690) {
            posisiBom = 0;
            b = Math.random(Math.floor())*550
        }
        const playerRect = player.getBoundingClientRect()
        const tacoRect = taco.getBoundingClientRect()
        const bomRect = bom.getBoundingClientRect()
        
        if (
            playerRect.left < tacoRect.right &&
            playerRect.right > tacoRect.left &&
            playerRect.top < tacoRect.bottom &&
            playerRect.bottom > tacoRect.top
        ) {
            nilai += 10
            score.textContent = `Score : ${nilai}`
            posisi = 0
            a = Math.random(Math.floor())*550
        }
        if (
            playerRect.left < bomRect.right &&
            playerRect.right > bomRect.left &&
            playerRect.top < bomRect.bottom &&
            playerRect.bottom > bomRect.top
        ) {
            nilai_darah -= 1
            darah.textContent = `Live : ${nilai_darah}`
            posisiBom = 0
            b = Math.random(Math.floor())*550
        }
        if (nilai_darah <= 0) {
            bom.style.display = "none"
            taco.style.display = "none"
            clearInterval(loopnya)
            document.querySelector(".kalah").style.display = "block";
            document.querySelector(".total").textContent = `Total Score: ${nilai}`
            document.querySelector(".ulang").addEventListener("click", jatuh)
            
        }
    }, 20)
}


