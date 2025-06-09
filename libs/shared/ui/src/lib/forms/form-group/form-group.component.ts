import { Component, HostBinding, input } from "@angular/core";

@Component({
  selector: "mwc-form-group",
  templateUrl: "./form-group.component.html",
  styleUrls: ["./form-group.component.css"],
})
export class FormGroupComponent {
  @HostBinding("class.form-group") formGroupClass = true;

  labelText = input.required<string>();
}
