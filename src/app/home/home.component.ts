import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  showModal = false
  unityInstance:any
  showMessageExchange = false
  selectionScene: string
  carbonIntro: string = "Carbon is IBM’s open source design system for products and digital experiences. With the IBM Design Language as its foundation, the system consists of working code, design tools and resources, human interface guidelines, and a vibrant community of contributors."
  embedViewContent = "This allows user to embed Unity view within Web view. This unity web view can be triggered for full screen view via the Fullscreen view button. User can also send message to web via the send message button."
  messageExchange = "This allows user to send message from unity to Angular and vice versa. This feature can be used when you need to transfer data between two different platforms."

  constructor() { }

  ngOnInit(): void {
  } 

  navigateToUnity(sceneName: string) {
    this.showModal = true
    this.selectionScene = sceneName
  }

  openMesssageExchangeModal() {
    this.showMessageExchange = true
  }

  closeUnityModal() {
    this.showModal = false
    this.showMessageExchange = false
  }

  getunityInstance($event) {
    this.unityInstance = $event
  }
  changeRotation(direction){
    if(direction) {
      this.unityInstance.SendMessage('Decider Object', 'ChangeRotationDirection', 'clockwise')
    } else  {
      this.unityInstance.SendMessage('Decider Object', 'ChangeRotationDirection', 'anticlockwise')
    }
}

}
