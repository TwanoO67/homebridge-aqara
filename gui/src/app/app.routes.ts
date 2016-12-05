import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { PageNumComponent } from './pages/page-num/page-num.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientEditComponent } from './pages/client/edit/edit';

const routes: Routes = [
    // Root
    { path: '', component: HomeComponent},
    { path: 'facture/client/:id', component: HomeComponent},
    { path: 'page/:id', component: PageNumComponent},
    { path: 'client/:id', component: ClientEditComponent },
    { path: 'client', component: ClientComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
