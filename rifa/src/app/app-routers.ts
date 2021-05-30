import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RifasComponent } from './rifas/rifas.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './security/login/login.component';
import { CadastroComponent } from './security/cadastro/cadastro.component';
import { RifanComponent } from './rifan/rifan.component';
import { CreateRifaComponent } from './rifan/create-rifa/create-rifa.component';
import { TokenComponent } from './rifan/token/token.component';
import { AuthGuard } from './security/auth-guard';
import { ShowRifaComponent } from './rifan/show-rifa/show-rifa.component';
import { RafflerComponent } from './rifan/raffler/raffler.component';
import { ShowWinnerComponent } from './rifan/show-winner/show-winner.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]  },
    { path: 'home', component: HomeComponent},
    { path: 'token', component: TokenComponent },
    { path: 'login', component: LoginComponent },
    { path: 'rifas', component: RifasComponent },
    { path: 'rifan/rifas', component: RifasComponent, canActivate: [AuthGuard] },
    {
        path: 'rifan', component: RifanComponent,
        canActivate: [AuthGuard]
    },
    { path: 'addrifa', component: CreateRifaComponent, canActivate: [AuthGuard] },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'myrifa', component: ShowRifaComponent, canActivate: [AuthGuard] },
    { path: 'raffler', component: RafflerComponent, canActivate: [AuthGuard] },
    { path: 'winner', component: ShowWinnerComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: '**', component: HomeComponent }
];
