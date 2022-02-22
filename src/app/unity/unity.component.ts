import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UnityComponent implements OnInit {
 showModal:  boolean 
 messageFromUnity: string
 gameInstance: any = null
//  @Input() sendMessageTapped: boolean
 @Output() unityInstance =  new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    this.loadUnityScene()
  }

  loadUnityScene() {
    var scriptUrl = "https://cdn.jsdelivr.net/npm/@microsoft/signalr@3.1.10/dist/browser/signalr.min.js"
    var buildUrl = "assets/AssetBundle2d/Build";
    var loaderUrl = buildUrl + "/AssetBundle2d.loader.js";
    var config = {
      dataUrl: buildUrl + "/AssetBundle2d.data.unityweb",
      frameworkUrl: buildUrl + "/AssetBundle2d.framework.js.unityweb",
      codeUrl: buildUrl + "/AssetBundle2d.wasm.unityweb",
      streamingAssetsUrl: "assets/AssetBundle2d/StreamingAssets",
      companyName: "DefaultCompany",
      productName: "E&U_2DviewSample1",
      productVersion: "0.1",
      devicePixelRatio: 0
    };

    // var buildUrl = "assets/MF_gameView_localcache/Build";
    // var loaderUrl = buildUrl + "/MF_gameView_localcache.loader.js";
    // var config = {
    //   dataUrl: buildUrl + "/MF_gameView_localcache.data.unityweb",
    //   frameworkUrl: buildUrl + "/MF_gameView_localcache.framework.js.unityweb",
    //   codeUrl: buildUrl + "/MF_gameView_localcache.wasm.unityweb",
    //   streamingAssetsUrl: "assets/MF_gameView_localcache/StreamingAssets",
    //   companyName: "DefaultCompany",
    //   productName: "E&U_2DviewSample1",
    //   productVersion: "0.1",
    //   devicePixelRatio: 0
    // };

    let container = document.querySelector("#unity-container") || new Element();
    var canvas: HTMLElement = document.querySelector("#unity-canvas") || new HTMLElement();
    var loadingBar: HTMLElement = document.querySelector("#unity-loading-bar") || new HTMLElement();
    var progressBarFull: HTMLElement = document.querySelector("#unity-progress-bar-full") || new HTMLElement();
    var fullscreenButton: HTMLElement = document.querySelector("#unity-fullscreen-button") || new HTMLElement();

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      config.devicePixelRatio = 1;
    } else {
      canvas.style.width = "1000px"; 
      canvas.style.height = "610px"
    }
    loadingBar.style.display = "block";
    var script = document.createElement("script");
    var unityscript = document.createElement("script");
    unityscript.src = scriptUrl;
    script.id = "unity"
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
        this.gameInstance = unityInstance;
        this.unitySceneSelection();
        this.unityInstance.emit(unityInstance)
        loadingBar.style.display = "none";
        fullscreenButton.onclick = () => {
        var browserType = this.checkBrowser()
        if(browserType == 'Safari') { 
          alert("Your browser does not support a full screen view for Unity.")
        } else {
          unityInstance.SetFullscreen(1);
        }
        };
      }).catch((message) => {
        alert(message);
      });
    }; 
    
    document.body.appendChild(script);
    document.body.appendChild(unityscript);
    

    // var data = (<any>window).messageFromUnity
        // console.log("message from untiy ", + messageFromUnity)
  
    (window as any).alert = (message: string) => {
      this.showModal = true
      this.messageFromUnity = message
      // console.log("message from unity: " + message);
    }
  }

  unitySceneSelection() {
     this.gameInstance.SendMessage('Decider', 'deciderMethodForWeb', 'SimulationScene');
  }

  checkBrowser(): string { 
    if(navigator.userAgent.indexOf("Chrome") != -1 ){
      return 'Chrome';
    }else if(navigator.userAgent.indexOf("Safari") != -1){
      return 'Safari';
    }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
      return 'Firefox';
    } else {
      return 'unknown';
    }
  }

  closeModal() {
    this.showModal = false
  }
}
