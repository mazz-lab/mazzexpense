import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ChartsModule,
    PipesModule
  ],
})
export class HomePageModule {}
