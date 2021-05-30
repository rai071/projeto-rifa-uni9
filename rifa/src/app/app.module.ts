import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import locatePt from '@angular/common/locales/pt';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

registerLocaleData(locatePt, 'pt');

import { ROUTES } from './app-routers';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RifasComponent } from './rifas/rifas.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailsComponent } from './header/user-details/user-details.component';
import { CadastroComponent } from './security/cadastro/cadastro.component';
import { InputComponent } from './messages/input/input.component';
import { RifasCartComponent } from './rifas/rifas-cart/rifas-cart.component';
import { RifanComponent } from './rifan/rifan.component';
import { CreateRifaComponent } from './rifan/create-rifa/create-rifa.component';
import { ServiceConf } from './service/service-config';
import { ShowRifaComponent } from './rifan/show-rifa/show-rifa.component';
import { TokenComponent } from './rifan/token/token.component';
import { AuthGuard } from './security/auth-guard';
import { RafflerComponent } from './rifan/raffler/raffler.component';
import { ShowWinnerComponent } from './rifan/show-winner/show-winner.component';
// import { HttpConfigInterceptor } from './security/HttpConfigInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RifasComponent,
    AboutComponent,
    HeaderComponent,
    LoginComponent,
    UserDetailsComponent,
    CadastroComponent,
    InputComponent,
    RifasCartComponent,
    RifanComponent,
    CreateRifaComponent,
    ShowRifaComponent,
    TokenComponent,
    RafflerComponent,
    ShowWinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuard, ServiceConf,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
