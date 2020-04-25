import { Subscription } from 'rxjs';
import { SettingsService } from './../../services/app-settings/settings.service';
import { SelectOption } from './../../models/CustomSelect';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit, OnDestroy {

  constructor(
    private readonly settings: SettingsService
  ) { }

  subscriptions: Subscription = new Subscription();

  units: SelectOption[] = [
    { value: 'imperal', name: 'Fahrenheit' },
    { value: 'metric', name: 'Celsius' },
    { value: '', name: 'Kelvin' }
  ]

  settingsForm = new FormGroup({
    units: new FormControl('metric')
  });

  ngOnInit() {
    this.subscriptions.add(
      this.settings.settings
        .subscribe(appSettings => this.settingsForm.patchValue(appSettings, { emitEvent: false })));

    this.subscriptions.add(this.settingsForm.valueChanges.subscribe(() => this.changeSettings()));
  }

  ngOnDestroy(){ this.subscriptions.unsubscribe() }

  changeSettings() {
    this.settings.changeSettings(this.settingsForm.value).subscribe();
  }

}
