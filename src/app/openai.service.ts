import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey: string = 'ssk-proj-o5rcLnTUSM-Ge9ZLOFnJw27gyG-y0qKiM3sEskuVl5W3QI3WJ4P5e4fthwBcE55B44GmjkwqF5T3BlbkFJXhCk6Vk-aLRKoeaqAjHvnTxSYwAYQZwzSHdOQ4shndc6WWtqjISPFllNXMOmKIjK7kaqYVD24A';
  constructor() { }

  async generateIdea(prompt: string): Promise<string> {

    const url = 'https://api.openai.com/v1/chat/completions';
    try {
      const response = await axios.post(url, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Eres un generador de ideas'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 100,
        temperature: 0.5,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        }
      });
      console.log('Respuesta de OpenAI', response.data);
      if (response.data && response.data.choices && response.data.choices[0].message) {
        return response.data.choices[0].message.content.trim();
      } else {
        console.error('No se encontró el mensaje en la respuesta de OpenAI');
        return 'Hubo un error en la respuesta de OpenAI';
      }
    } catch (error) {
      console.error('Error al llamar a OpenAI', error);
      return 'Hubo un error al llamar a OpenAI. Intenta nuevamente';
    }
  }
}