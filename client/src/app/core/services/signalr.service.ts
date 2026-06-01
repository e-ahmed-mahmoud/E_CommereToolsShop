import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { OrderModel } from '../../shared/models/order-model';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  hubUrl = environment.HubUrl;
  hubConnection?: HubConnection;
  order = signal<OrderModel | undefined>(undefined);

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('OrderCompleteNotification', (order: OrderModel) => {
      this.order.set(order);
    });
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch((err) => console.log(err));
    }
  }
}
