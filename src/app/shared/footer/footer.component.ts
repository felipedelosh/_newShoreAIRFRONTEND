import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    //Personal Links
    goPortFolio(){
      this.goUrlNewTab("https://felipedelosh.github.io/AFE-PORTFOLIO/");
    }

    goGitHuB(){
      this.goUrlNewTab("https://github.com/felipedelosh");
    }

    goStackOverFlow(){
      this.goUrlNewTab("https://es.stackoverflow.com/users/182484/andres-felipe-hernandez");
    }

    goYoutube(){
      this.goUrlNewTab("https://www.youtube.com/@doctorfhernandez1/videos");
    }

    goLinkedin(){
      this.goUrlNewTab("https://www.linkedin.com/in/felipedelosh");
    }

    goInstagram(){
      this.goUrlNewTab("https://www.instagram.com/ccc_co_ccc");
    }
  
    goUrlNewTab(url: string) {
      window.open(url, '_blank');
    }
}
