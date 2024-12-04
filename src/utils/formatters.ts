export const formatteConceito = (pontuacao: number) => {
    if(pontuacao < 3.5){
        return "INSUFICIENTE"
    } else if(pontuacao >= 3.5 && pontuacao < 5){
        return "ANS"
    } else if(pontuacao >= 5 && pontuacao <= 6){
        return "BOM"
    } else if(pontuacao > 6 && pontuacao < 9){
        return "ÓTIMO"
    } else if(pontuacao >= 9){
        return "EXCELENTE"
    } else{
        return "--"
    }
}