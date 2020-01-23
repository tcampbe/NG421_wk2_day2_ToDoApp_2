import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  async show(): Promise<any> {
    const model = this.modalService.open(ConfirmationModalComponent);

    const confirmationModalComponent: ConfirmationModalComponent =
      model.componentInstance;

    confirmationModalComponent.modalInstance = model;

    return await model.result;
  }
}
