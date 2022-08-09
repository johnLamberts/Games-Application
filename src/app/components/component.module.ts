import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { GaugeModule } from 'angular-gauge';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:game-search', component: HomeComponent },
  { path: 'details/:gameId', component: DetailsComponent },
];

@NgModule({
  declarations: [SearchComponent, HomeComponent, DetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    GaugeModule.forRoot()
  ],
  exports: [SearchComponent, HomeComponent, DetailsComponent],
})
export class ComponentModule {}
