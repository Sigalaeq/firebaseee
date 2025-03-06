import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle]
})
export class ForgotPasswordPage implements OnInit {




  ngOnInit() {
  }

  emailInput: string = '';


  constructor(private authService: AuthService,
    private alertController: AlertController,
    private router: Router) { }




  async onSubmit() {
    try {
      await this.authService.resetPassword(this.emailInput);
      const alert = await this.alertController.create({
        header: 'Contraseña restablecida',
        message: 'Se envio el correo',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl('login');


    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo enviar el correo',
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
    this.router.navigateByUrl("login")
  }

}
