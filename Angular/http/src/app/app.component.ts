import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostModel } from "./post.model";
import { PostService } from "./post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.fetchPosts();
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  fetchPosts() {
    this.isFetching = true;

    this.postService.fetchPosts().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      error => {
        this.error = error.message;
        this.isFetching = false;
      }
    );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
