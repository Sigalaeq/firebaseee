import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle]
})
export class LoginPage implements OnInit {



  ngOnInit() {
  }
  emailInput: string = '';
  passwordInput: string = '';

  constructor(private authService: AuthService,
    private alertController: AlertController,
    private router: Router) { }




  async onSubmit() {
    try {
      await this.authService.login(this.emailInput, this.passwordInput);
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'You have logged in successfully',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl('login');


    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'An error occurred: ',
        buttons: ['OK'],
      });
      await alert.present();
    }

  }


  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  onSignup() {
    this.router.navigateByUrl("sing-up")
  }

  onReset() {
    this.router.navigateByUrl("reset-password")
  }
}