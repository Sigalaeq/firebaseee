import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { OpenaiService } from '../openai.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, FormsModule],
})
export class HomePage {
  constructor(private router: Router, private OpenAIService: OpenaiService) { }
  ideaPrompt: string = '';
  generatedIdea: string = '';


  async generateIdea() {
    if (this.ideaPrompt.trim() === '') {
      alert('Por favor, ingresa una idea');
      return;
    }
    this.generatedIdea = await this.OpenAIService.generateIdea(this.ideaPrompt);
  }
}
