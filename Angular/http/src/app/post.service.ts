import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from "@angular/common/http";
import { PostModel } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: PostModel = { title, content };

    this.http
      .post<{ name: string }>(
        "https://angular-98a53.firebaseio.com/posts.json",
        postData,
        {
          observe: "body" // response is available as well
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error = error.message;
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: PostModel }>(
        "https://angular-98a53.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({
            "Custom-Header": "Hello"
          }),
          params: new HttpParams().set("print", "pretty")
        }
      )
      .pipe(
        map((responseData: { [key: string]: PostModel }) => {
          const posts: PostModel[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              posts.push({ ...responseData[key], id: key });
            }
          }

          return posts;
        }),
        catchError(errorRes => {
          // Send analytics serve
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete("https://angular-98a53.firebaseio.com/posts.json", {
        observe: "events"
      })
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Sent) {
            //
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
