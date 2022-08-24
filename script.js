
const URL = "https://restcountries.com/v3.1/"


fetch(`${URL}all`)
    .then((resp) => resp.json())
    .then(function (data) {

        let table = document.getElementById('tablebody')

            //Geração da Tabela
        data.forEach(function (element, index) {

            let area = element.area.toLocaleString('us', { minimumFractionDigits: 2, maximumFractionDigits: 2 })


            let capital = element.capital == undefined ? "-" : element.capital

            let currencies = element.currencies == undefined ? "-" : Object.keys(element.currencies)

            table.innerHTML += `<tr>
                                    <td>${element.name.common}</td>
                                     <td>${capital}</td>
                                    <td>${area}</td>
                                    <td>${currencies}</td>
                               </tr>`

        })

    })
    .catch(function (error) {
        console.log(error)
    })


    //Geração do arquivo XLSX
function exportTableToExcel() {
    let fileName = document.getElementById('fileName').value
    let downloadLink
    let dataType = 'application/vnd.ms-excel'
    let tableSelect = document.getElementById('table')

    //Substituir todos os espaços por %20 para que o excel possa entender como separador

    let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

    // Especificar o nome do arquivo
    fileName = fileName ? fileName + '.xls' : 'Countries List.xls'

    downloadLink = document.createElement("a")

    document.body.appendChild(downloadLink)

    if (navigator.msSaveOrOpenBlob) {
        let blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        })
        navigator.msSaveOrOpenBlob(blob, fileName)
    } else {

        downloadLink.href = 'data:' + dataType + ', ' + tableHTML

        // Define o nome do arquivo para download
        downloadLink.download = fileName

        //Adiciona o click de trigger
        downloadLink.click()
    }
}

