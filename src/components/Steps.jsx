import $ from "jquery"
import CryptoJS from "crypto-js";
import OAuth from "oauth-1.0a";
import { useHistoryProcess } from "../store/historyProcess";
import { useState } from "react";
import { Slide, Zoom } from "react-awesome-reveal";
import svgNotFound from "../assets/svgNotFound.svg"
import searchSvg from "../assets/searchSvg.svg"
import vivaSergipe from "../assets/vivaSergipe.jpg"

const Steps = () => {

  const [userProcessNumber, setUserProcessNumber] = useState("")
  const [searchKey, setSearchKey] = useState(0);
  const [verificaPatrocinio, setVerificaPatrocinio] = useState(null)
  const [recebimento, setRecebimento] = useState(null)
  const [documentacao, setVerificaDocumentacao] = useState(null)
  const [analiseProposta, setAnaliseProposta] = useState(null)
  const [tramite, setTramite] = useState(null)
  const [interesse, setInteresse] = useState(null)
  const [patrocinioAprovado, setPatrocinioAprovado] = useState(null)
  const [showNotFound, setShowNotFound] = useState(false);
  const updateHistory = useHistoryProcess((state) => state.updateHistory);
  const getHistory = useHistoryProcess((state) => state.history)
  //CONSUMINDO API
  // eslint-disable-next-line no-unused-vars
  function getDatasetExterno(dataset, filtros, cb) {
    var oauth = OAuth({
      consumer: {
        'key': 'formularioreact', // nome do aplicativo que você criou
        'secret': 'acessoreact' // nome do aplicativo que você criou
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
      },
      nonce_length: 6
    });

    var request_data = {
      url: 'http://10.26.4.22:8080/api/public/ecm/dataset/datasets',
      method: 'POST'
    };

    //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
    var data = {
      "name": dataset,
      "fields": [],
      "constraints": filtros,
      "order": []
    }

    var token = {
      'key': 'b88625ed-c90d-4bee-80eb-7292cb718ecd',
      'secret': '9968af7e-06cb-4307-a220-48b043f2d0b7b4d50944-7459-4fd7-86a1-7310e083b3d8'
    }

    $.ajax({
      url: request_data.url,
      contentType: 'application/json',
      crossDomain: true,
      async: false,
      type: request_data.method,
      data: JSON.stringify(data),
      //data: oauth.authorize(request_data, token)
      headers: oauth.toHeader(oauth.authorize(request_data, token))
    }).done(function (data) {
      if (dataset == "processHistory") {
        setShowNotFound(true)
        updateHistory(data);
        verificaRecebimento(data)
        verificaDocumentacao(data)
        analisaProposta(data)
        tramiteSolicitacao(data)
        aprovadoPatrocinio(data)
        interessePatrocinio(data)
        console.log(data);
      } if (dataset == "processTask") {
        verificaSolicitacaoPatrocinio(data)
      }
    });

  }

  //CONSUMO DA FUNÇÃO GENERICA		

  const fetchApi = () => {
    var filtro = [{
      _field: "processInstanceId",
      _initialValue: userProcessNumber,
      _finalValue: userProcessNumber,
      _type: 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
      _likeSearch: false
    }, {
      _field: "",
      _initialValue: "",
      _finalValue: "",
      _type: 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
      _likeSearch: false
    }];
    getDatasetExterno("processTask", filtro, function (data) {
      console.log("EXECUTOU CALLBACK", data);
    });
    getDatasetExterno("processHistory", filtro, function (data) {
      console.log("EXECUTOU CALLBACK", data);
    });
  }

  const handleSearch = () => {
    // Atualize a chave quando você realizar uma nova pesquisa
    setSearchKey((prevKey) => prevKey + 1);
  };

  const verificaSolicitacaoPatrocinio = (data) => {
    const dataItem = data?.content?.values?.find((atividade) => {
      if (atividade["processTaskPK.colleagueId"] == "solicitacaodepatrocinio2") {
        setShowNotFound(true)
        return atividade
      }
    })
    setVerificaPatrocinio(dataItem)
  }

  const verificaRecebimento = (data) => {
    const dataItem = data?.content?.values?.find((atividade) => {
      if (atividade.stateSequence == 116) {
        return atividade
      }
    })
    setRecebimento(dataItem)
  }

  const verificaDocumentacao = (data) => {
    const dataItem = data?.content?.values?.find((atividade) => {
      if (atividade.stateSequence == 5) {
        return atividade
      }
    })
    setVerificaDocumentacao(dataItem)
  }

  const analisaProposta = (data) => {
    const dataItem = data?.content?.values?.find((atividade) => {
      if (atividade.stateSequence == 125) {
        return atividade
      }
    })
    setAnaliseProposta(dataItem)
  }

  const tramiteSolicitacao = (data) => {
    const dataItem = data?.content?.values?.find((atividade) => {
      if (atividade.stateSequence == 34) {
        return atividade
      }
    })
    setTramite(dataItem)
  }

  const interessePatrocinio = (data) => {
    const dataItem = data?.content?.values?.find((atividade) => {
      if (atividade.stateSequence == 89) {
        return atividade
      }
    })
    setInteresse(dataItem)
  }

  const aprovadoPatrocinio = (data) => {
    const dataItem = data?.content?.values?.find((atividade) => {
      if (atividade.stateSequence == 91) {
        return atividade
      }
    })
    setPatrocinioAprovado(dataItem)
  }

  const horasMovimentacoes = ((data) => {
    const dataHour = new Date(data);
    const diaHour = String(dataHour.getDate()).padStart(2, '0');
    const mesHour = String(dataHour.getMonth() + 1).padStart(2, '0'); // Os meses são base 0, então somamos 1.
    const anoHour = String(dataHour.getFullYear());
    const horaHour = String(dataHour.getHours()).padStart(2, '0');
    const minutosHour = String(dataHour.getMinutes()).padStart(2, '0');
    const segundosHour = String(dataHour.getSeconds()).padStart(2, '0');
    return `${diaHour}/${mesHour}/${anoHour} ${horaHour}:${minutosHour}:${segundosHour}`;
  });

  //RETORNANDO O HTML
  return (
    <>
      <h2 className="text-[1.2rem] lg:text-[1.3rem] font-medium text-gray-700 text-center mt-5 tracking-wider">
        Consulte o andamento da solicitação
      </h2>
      <div className="flex justify-center mt-2">
        <div className="relative">
          <div>
            <input
              onChange={(e) => setUserProcessNumber(e.target.value)}
              className="h-10 w-full rounded-full bg-white pe-10 ps-4 text-sm shadow-md sm:w-56"
              id="search"
              type="number"
              maxLength={5}
              max={5}
              placeholder="Número da solicitação"
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  handleSearch()
                  fetchApi();
                }
              }}
            />

            <button
              onClick={() => {
                handleSearch()
                fetchApi()
              }}
              type="button"
              className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-[#005EB8] p-2 text-white transition"
            >
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
      {getHistory?.content?.values?.length > 0 && verificaPatrocinio &&
        <Slide key={searchKey}>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto flex flex-wrap">
              <div className="flex flex-wrap w-full">
                <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-4">
                  {recebimento &&
                    <div className="flex relative pb-12">
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">SOLICITAÇÃO RECEBIDA -  {horasMovimentacoes(recebimento?.movementDatetime)}</h2>
                        <p className="leading-relaxed">Sua solicitação foi recebida com sucesso.</p>
                      </div>
                    </div>
                  }
                  {documentacao && <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">VERIFICAÇÃO DE DOCUMENTOS - {horasMovimentacoes(documentacao?.movementDatetime)}</h2>
                      <p className="leading-relaxed">Sua solicitação está em processo de verificação de documentos.</p>
                    </div>
                  </div>
                  }
                  {analiseProposta &&
                    <div className="flex relative pb-12">
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                          <path d="M 12.5 4 C 10.032499 4 8 6.0324991 8 8.5 L 8 39.5 C 8 41.967501 10.032499 44 12.5 44 L 35.5 44 C 37.967501 44 40 41.967501 40 39.5 L 40 18.5 A 1.50015 1.50015 0 0 0 39.560547 17.439453 L 39.544922 17.423828 L 26.560547 4.4394531 A 1.50015 1.50015 0 0 0 25.5 4 L 12.5 4 z M 12.5 7 L 24 7 L 24 15.5 C 24 17.967501 26.032499 20 28.5 20 L 37 20 L 37 39.5 C 37 40.346499 36.346499 41 35.5 41 L 12.5 41 C 11.653501 41 11 40.346499 11 39.5 L 11 8.5 C 11 7.6535009 11.653501 7 12.5 7 z M 27 9.1210938 L 34.878906 17 L 28.5 17 C 27.653501 17 27 16.346499 27 15.5 L 27 9.1210938 z M 17.5 25 A 1.50015 1.50015 0 1 0 17.5 28 L 30.5 28 A 1.50015 1.50015 0 1 0 30.5 25 L 17.5 25 z M 17.5 32 A 1.50015 1.50015 0 1 0 17.5 35 L 26.5 35 A 1.50015 1.50015 0 1 0 26.5 32 L 17.5 32 z" fill="white"></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">ANÁLISE DA PROPOSTA - {horasMovimentacoes(analiseProposta?.movementDatetime)}</h2>
                        <p className="leading-relaxed">Sua proposta está sendo analisada pelo setor responsável.</p>
                      </div>
                    </div>
                  }
                  {tramite &&
                    <div className="flex relative pb-12">
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">TRAMITE DE SOLICITAÇÃO - {horasMovimentacoes(tramite?.movementDatetime)}</h2>
                        <p className="leading-relaxed">A solicitação está em processo de tramitação.</p>
                      </div>
                    </div>
                  }
                  {interesse &&
                    <div className="flex relative pb-12">
                      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">MANIFESTAÇÃO DE INTERESSE - {horasMovimentacoes(interesse?.movementDatetime)}</h2>
                        <p className="leading-relaxed">Manifeste seu interesse no patrocínio.</p>
                      </div>
                    </div>
                  }
                  {patrocinioAprovado &&
                    <div className="flex relative">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                          <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                      </div>
                      <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">PATROCÍNIO APROVADO - {horasMovimentacoes(patrocinioAprovado?.movementDatetime)}</h2>
                        <p className="leading-relaxed">Seu patrocínio foi aprovado.</p>
                      </div>
                    </div>
                  }
                </div>
                <img className="lg:w-3/5 md:w-1/2 object-contain object-center rounded-lg md:mt-0 mt-12" src={vivaSergipe} alt="step" />
              </div>
            </div>
          </section>
        </Slide >
      }

      {
        !showNotFound &&
        < Slide key={searchKey}>
          <div className="grid px-4 bg-white mt-20">
            <div className="text-center">
              <img className="w-auto h-56 mx-auto text-black sm:h-52" src={searchSvg} />
              <h1
                className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                Pesquise sua solicitaçao !
              </h1>

              <p className="mt-4 text-gray-500">Acompanhe o andamento da sua solicitação</p>
            </div>
          </div>
        </Slide >
      }

      {
        !verificaPatrocinio && showNotFound &&
        < Zoom key={searchKey}>
          <div className="grid  px-4 bg-white mt-20">
            <div className="text-center">
              <img className="w-auto h-56 mx-auto text-black sm:h-64" src={svgNotFound} />
              <h1
                className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                Solicitação não encontrada !
              </h1>

              <p className="mt-4 text-gray-500">Confira o número da sua solicitação e tente novamente</p>
            </div>
          </div>
        </Zoom >
      }

    </>
  )

}

export default Steps