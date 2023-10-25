import $ from "jquery"
import CryptoJS from "crypto-js";
import OAuth from "oauth-1.0a";
import { useHistoryProcess } from "../store/historyProcess";
import { useEffect } from "react";

const Steps = ()=>{

  const updateHistory = useHistoryProcess((state) => state.updateHistory);

  useEffect(() => {
    
  }, [updateHistory]);
  
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
          }).done(function(data) {
              console.log(data); 
          });
        
  }
  
  var filtro = [{
    _field: "processInstanceId",
    _initialValue: "2320",
    _finalValue:"2320",
    _type: 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
    _likeSearch: false
    }, {
    _field: "",
    _initialValue: "",
    _finalValue: "",
    _type: 1, //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
    _likeSearch: false
    }];
  //CONSUMO DA FUNÇÃO GENERICA		
  
  // getDatasetExterno("processTask", filtro, function(data){
  //   console.log("EXECUTOU CALLBACK",data);
  // });




  //RETORNANDO O HTML
  return(
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex flex-wrap">
      <div className="flex flex-wrap w-full">
        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
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
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">SOLICITAÇÃO RECEBIDA</h2>
              <p className="leading-relaxed">VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.</p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">VERIFICAÇÃO DE DOCUMENTOS</h2>
              <p className="leading-relaxed">Vice migas literally kitsch +1 pok pok. Truffaut hot chicken slow-carb health goth, vape typewriter.</p>
            </div>
          </div>
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
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">ANÁLISE DA PROPOSTA</h2>
              <p className="leading-relaxed">Coloring book nar whal glossier master cleanse umami. Salvia +1 master cleanse blog taiyaki.</p>
            </div>  
          </div>
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
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">TRAMITE DE SOLICITAÇÃO</h2>
              <p className="leading-relaxed">VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.</p>
            </div>
          </div>
          <div className="flex relative">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#005EB8] inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">PATROCÍNIO APROVADO</h2>
              <p className="leading-relaxed">Pitchfork ugh tattooed scenester echo park gastropub whatever cold-pressed retro.</p>
            </div>
          </div>
        </div>
        <img className="lg:w-3/5 md:w-1/2 object-contain object-center rounded-lg md:mt-0 mt-12" src="https://i.ytimg.com/vi/aqayamHtrkc/maxresdefault.jpg" alt="step"/>
      </div>
    </div>
  </section>
  )

}

export default Steps