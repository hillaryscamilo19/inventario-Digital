import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { LoginModule } from './features/login/login.module';

@NgModule({
  declarations: [],

  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    LoginComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
