import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [MatTabsModule, MatIconModule, MatFormFieldModule, MatSelectModule ],
  exports: [MatTabsModule, MatIconModule, MatFormFieldModule, MatSelectModule],
})
export class MaterialModule {}
