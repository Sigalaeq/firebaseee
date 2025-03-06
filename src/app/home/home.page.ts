import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { OpenaiService } from '../openai.service';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, FormsModule],
})
export class HomePage {
  constructor(private router: Router, private OpenAIService: OpenaiService, private authService: AuthService, private alertController: AlertController) { }
  ideaPrompt: string = '';
  generatedIdea: string = '';


  async generateIdea() {
    if (this.ideaPrompt.trim() === '') {
      alert('Por favor, ingresa una idea');
      return;
    }
    this.generatedIdea = await this.OpenAIService.generateIdea(this.ideaPrompt);
  }


  async onSignup() {
    try {
      await this.authService.logout();
      const alert = await this.alertController.create({
        header: 'Logout succesfuly',
        message: 'Your account has been logout',
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
}
