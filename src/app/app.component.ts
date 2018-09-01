import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  topics = ['Movies', 'Food', 'Shopping', 'Reading', 'Driving'];

  isFormSubmitted: boolean = false;
  isFormSubmitSuccessfully: boolean = true;
  errorMsg = '';

  userModel: User = new User('', 'dsrawat@gmail.com', 1234567890, 'default', 'morning', true);

  topicHasError: boolean = true;

  constructor(private _enrollService: EnrollmentService) {}

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    this.isFormSubmitted = true;
    this._enrollService.enroll(this.userModel)
      .subscribe(
        data =>  {console.log("Success!", data); this.isFormSubmitSuccessfully = true },
        error => {console.log("Error!", error); ; this.isFormSubmitSuccessfully = false; this.errorMsg = error.statusText} 
      );
    

  }

  submitForm() {
    alert("Thanks for your interest in Boot camp! \n\nYour data is: " + JSON.stringify(this.userModel));
  }
}
