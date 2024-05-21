import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPost } from './blog-post.module';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  facebookIcon = faFacebook;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;


  artworks = [
    {
      title: 'Sunset Bliss',
      author: 'John Doe',
      description: 'A beautiful sunset near the seashore.',
      image: 'assets/sunset.jpg'
    },
    {
      title: 'City Lights',
      author: 'Jane Smith',
      description: 'The vibrant city lights at night.',
      image: 'assets/citylights.webp'
    },
    {
      title: 'Nature\'s Calm',
      author: 'Mary Johnson',
      description: 'A serene view of a calm lake surrounded by trees.',
      image: 'assets/nature.jpg'
    },
    {
      title: 'Moonlit Tranquility',
      author: 'Michael White',
      description: 'A peaceful scene of a moonlit night in the countryside.',
      image: 'assets/moon.jpg'
    },
    {
      title: 'Winter Wonderland',
      author: 'Sarah Brown',
      description: 'A snowy landscape with frost-covered trees and mountains.',
      image: 'assets/winter.jpg'
    },
    {
      title: 'Abstract Harmony',
      author: 'Alex Johnson',
      description: 'An abstract composition depicting harmony and balance.',
      image: 'assets/harmony.avif'
    },
    {
      title: 'Misty Morning',
      author: 'Emily Davis',
      description: 'A misty morning in the forest with dew-covered leaves.',
      image: 'assets/misty.jpg'
    },
    {
      title: 'Urban Exploration',
      author: 'Jack Wilson',
      description: 'Exploring the urban landscape with its unique architecture.',
      image: 'assets/urban.avif'
    }
  ];

  blogPosts: BlogPost[] = [
    {
      title: 'Sunrise Serenity: Welcoming a New Day',
      author: 'David Smith',
      date: 'June 18, 2024',
      content: 'Sunrise Serenity captures the breathtaking beauty of dawn breaking over the horizon. As the sun rises, painting the sky with hues of pink and gold, a sense of peace and hope fills the air. It\'s a reminder that each new day brings with it endless possibilities and opportunities.',
      image: 'assets/sunrise2.jpg'
    },
    {
      title: 'Surreal Dreams: Exploring the Depths of Imagination',
      author: 'Sophia Brown',
      date: 'June 22, 2024',
      content: 'Surreal Dreams invites viewers to step into a world of fantasy and imagination, where reality and dreams merge into one. With its surreal landscapes and otherworldly elements, this artwork sparks curiosity and wonder, encouraging us to embrace the limitless potential of our minds.',
      image: 'assets/surreal.jpg'
    },
    {
      title: 'Tranquil Waters: A Journey of Reflection',
      author: 'Sophie Anderson',
      date: 'July 15, 2024',
      content: 'Tranquil Waters transports viewers to a serene lake surrounded by lush greenery. With the gentle ripples of the water and the soothing sounds of nature, the scene offers a moment of peace and contemplation, allowing for quiet reflection and introspection.',
      image: 'assets/waters.jpg'
    },
    {
      title: 'Enchanted Forest: Discovering Hidden Wonders',
      author: 'Daniel Jackson',
      date: 'July 20, 2024',
      content: 'Enchanted Forest beckons adventurers to explore its mystical depths and uncover its hidden wonders. With towering trees, winding paths, and glimpses of magical creatures, the forest is alive with the spirit of adventure and discovery.',
      image: 'assets/forest.jpg'
    },
    {
      title: 'Sunrise Splendor: Embracing the New Dawn',
      author: 'Eva Thompson',
      date: 'July 5, 2024',
      content: 'Sunrise Splendor captures the magnificent beauty of the first light of dawn as it breaks over the horizon. With hues of orange and purple painting the sky, the scene radiates warmth and hope, symbolizing new beginnings and fresh opportunities.',
      image: 'assets/sunrise.jpg'
    },
    {
      title: 'Mystical Moonlight: A Nighttime Journey',
      author: 'Michael Roberts',
      date: 'July 10, 2024',
      content: 'Mystical Moonlight invites viewers to immerse themselves in the enchanting beauty of the moonlit night. With shadows dancing across the landscape and a soft glow illuminating the surroundings, the scene evokes a sense of magic and mystery.',
      image: 'assets/mystical.jpg'
    },
  ];
}
