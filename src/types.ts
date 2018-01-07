import { InjectionToken } from '@angular/core';

export interface AppConfig {
  serviceAddress: string
}

//App config token
export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
