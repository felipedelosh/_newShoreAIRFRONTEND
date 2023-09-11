import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentPageComponent } from './components/content-page/content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


  
}
