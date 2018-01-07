import { Injector } from "@angular/core";

/**
 * public statci class for whole app.
 */
export class ServiceLocator {
  static injector: Injector;
  static accessToken: Promise<any>;  // record accesstoken for api.
  static language: string = ""; // record current language.
  static articleSearchKey: string = "";  // record article search key.
  static unSendTicket: any = { images: [], ticketMessage: "" };   // Store information for un send ticket.
}
