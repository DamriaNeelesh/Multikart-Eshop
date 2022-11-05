import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from '../services/contentful.service';

@Component({
  selector: 'app-blog-home-page',
  templateUrl: './blog-home-page.component.html',
  styleUrls: ['./blog-home-page.component.css']
})
export class BlogHomePageComponent implements OnInit {

  constructor(private contentfulService: ContentfulService) { }

  blogPosts$:Observable<any>|undefined;

  ngOnInit(): void {
    this.blogPosts$ = this.contentfulService.getAllEntries();
    console.log(this.blogPosts$);
  }

}
