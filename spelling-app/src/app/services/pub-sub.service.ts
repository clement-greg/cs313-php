import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class PubSubService {
    private pubSource = new Subject<PubSubEvent>();

  published = this.pubSource.asObservable();

  getPublishedEvent(): Observable<any> {
    return this.pubSource.asObservable();
  }

    publishEvent(event: PubSubEvent) {
        this.pubSource.next(event);
    }
}

export class PubSubEvent {
  constructor(eventName: string, data: any) {
    this.eventName = eventName;
    this.eventData = data;
  }

    eventName: string;
    eventData: any;
}