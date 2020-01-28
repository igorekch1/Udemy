# ANGULAR

Is JS Framweork, which allows u to build SPA Apps.

## Versions

- AngularJS(Angular 1)
- Angular 2(2016) - complete rewrite of AngularJS, no similarities.
- Angular 4
- Angular 5
- Angular 6
- Angular 7
- Angular 8

New version every 6 months.

Angular is split in many packages. So, if u need to use some feature u need to import a package in main file (app.module.ts). It's TS feature, not Angular.

** Decorators ** are a design pattern that is used to separate modification or decoration of a class without modifying the original source code. In AngularJS, decorators are functions that allow a service, directive or filter to be modified prior to its usage.

## Components & Databinding

To use component u have to import it **app.module.ts** to declaration field:

```typescript
import { AppComponent } from "./app.component";
import { ServerComponent } from "./server/server.component";

@NgModule({
  declarations: [AppComponent, ServerComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Creating components w/ CLI

To create a component w/ CLI run:

```typescript
ng generate component [name] or ng g c [name]
```

### Inline Template and CSS

Replace templateUrl w/ just template and provider specific template there.

```typescript
@Component({
  selector: "app-servers",
  template: `
    <app-server></app-server>
    <app-server></app-server>
  `,
  styleUrls: ["./servers.component.css"]
})
```

### Selecting components

1.By selector:

```typescript
selector: "app-servers"

<app-servers></app-servers>
```

2. By attribute

```typescript
selector: "[app-servers]"

<div app-servers></div>
```

3. By class

```typescript
selector: ".app-servers"

<div class=".app-servers"></div>
```

Also, you can provide inline CSS using styles instead of styleUrls. It will have higher priority cause it's inline styles:

```typescript
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [
    `
      h3 {
        color: red;
      }
    `
  ]
})
```

### Children

To pass children to component u can use special directive - _ng-content_:

```typescript
<app-server-element
      >
    <p>Children</p>
</app-server-element>
```

server-element.component.ts:

```typescript
<div>
    <ng-content></ng-content> // <p>Children</p>
</div>


```

## DataBinding

```typescript
export class TestCmp {
  data: Interface = {};
}

<p>{{ data }} - String interpolation</p>
```

### Property binding

To use property binding put an attribute in brackets:

```typescript
<button class="btn btn-primary" [disabled]="!allowAdd">Add</button>
```

### Event Binding

Provide event in curly braces and a function to execute.

```typescript
<button
  (click)="onCreate()"
>
  Add
</button>
```

Passing an event object w \$event:

```typescript
<input type="text" class="form-control" (input)="onUpdateServerName($event)" />
```

### Two-Way data binding

Combines both event and property binding:

```typescript
<input type="text" class="form-control" [(ngModel)]="someField" />
```

### Property binding

#### From parent to Child

To pass prop to child component you have to bind it on component you want to pass it to:

```typescript
app-server-element
    *ngFor="let serverElement of serverElements"
    [element]="serverElement"
></app-server-element>
```

And in child component you have to add _Input_ decorator to this prop:

```typescript
  @Input() element: { type: string; name: string; content: string };

```

#### Assinging an Alias

```typescript
[srvElement]="serverElement"


@Input("srvElement") element: { type: string; name: string; content: string };
```

#### From Child to Parent

Using EventEmitter:

1. Bind custom event on child component:

```typescript
<app-cockpit
    (serverCreated)="onServerAdded($event)"
></app-cockpit>
```

2. In child component declare this event:

```typescript
@Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>(); // call a constructor
```

3. Emit an event from child component:

```typescript
this.serverCreated.emit({
  serverName: this.newServerName,
  serverContent: this.newServerContent
});
```

4. Handle it in parent component:

```typescript
onServerAdded(serverData: { serverName: string; serverContent: string }) {
    // do some stuff
  }
```

#### Assinging an Alias

Pass named event to child component and listen to it providing the same name to Output decorator parameter.

```typescript
<app-cockpit
    (bpCreated)="onBluePrintAdded($event)"
></app-cockpit>

@Output("bpCreated") bluePrintCreated = new EventEmitter<{}>();
```

### Styles

Angular encapsulating css files and they are applied only for that component which css file belongs to.
Angular adds the same attribute to all DOM elements of the component, so that's why styles provided in component.css applies only to this component. It emulates Shadow DOM in such way cause old browsers do not support Shadow DOM.

To turn of style encapsulation you have to provide _encapsulation field_ and set it to ViewEncapsulation.None. Styles of this component will global.

```typescript
@Component({
  encapsulation: ViewEncapsulation.None // Native, Emulated (default)
})
```

### Local Reference

U can privide reference with #name and use it only in template where it was defined.

```typescript
    <input type="text" class="form-control" #serverNameInput />
    <button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
```

The ref is DOM element, so if u want to extract a value you can access it on the ref.value:

```typescript
onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value
    });
  }
```

### Getting access to template

Alternativly to local references, u can use @ViewChild decorator, instead.
@ViewChild('selector', {static : bool}). static param will be removed in Angular 9.

```typescript
<input type="text" class="form-control" #serverContent />
```

.ts:

```typescript
@ViewChild("serverContent", { static: true }) serverContentInput: ElementRef;
```

Type - ElementRef. Access to value:

```typescript
this.serverContentInput.nativeElement.value
```

Also, u can set ref on the Component:

```typescript
<color-sample
  #primaryColorSample
</color-sample>

@ViewChild('primaryColorSample')
  sample: ColorSampleComponent;
```

If u want to write component initialization code that uses the references injected by @ViewChild, u need to do it inside the AfterViewInit lifecycle hook:

```typescript
@ViewChild(ColorSampleComponent)
  primarySampleComponent: ColorSampleComponent;

  ngAfterViewInit() {
    console.log("primaryColorSample:", this.primarySampleComponent);
  }
```

### Children

To pass children to a component u can use specific directive _ng-model_

```typescript
<app-server-element>
   <p>Children</p>
</app-server-element>
```

server-element.component.ts

```typescript
<div>
    <ng-content></ng-content> // <p>Children</p>
</div>
```

#### Get access to ng-content

You can set a ref on childrens' element in root component and get acces to it in Child component via ContentChild.
@ContentChild("contentParagraph", { static: true }) paragraph: ElementRef;
If you DON'T use the selected element in ngOnInit, set static: false instead.

### Component Lifecycle

0. Constructor

1. ngOnChanges() - Called before ngOnInit() and whenever one or more data-bound input properties change. The method receives a SimpleChanges object of current and previous property values.

1. ngOnInit() - Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
   Called once when component is initialized, runs after the ngOnChanges().

1. ngDoCheck() - Called during every change detection run, immediately after ngOnChanges() and ngOnInit().
   Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

1. ngAfterContentInit() - Called after content (ng-content) has been projected into view.
   Called once after the first ngDoCheck().

1. ngAfterContentChecked() - Called every time the projected content has been checked.
   Called after the ngAfterContentInit() and every subsequent ngDoCheck().

1. ngAfterViewInit() - Called after the component's view (and child views) has been initialized.
   Called once after the first ngAfterContentChecked().

1. ngAfterViewChecked() - Called every time th view (and child views) had been checked.
   Called after the ngAfterViewInit() and every subsequent ngAfterContentChecked().

1. ngOnDestroy() - Called once the component is about to be destroyed.
   Unsubscribe Observables and detach event handlers to avoid memory leaks.

## Directives

Directvies - Instruction in the DOM (like components). We are extracting template and logic and put them in specific place.

Directives are divided into attribute and structural directives.

- Attribute directive - sits on elements like attributes(changes colors/bgs, etc.).
- Structural directive - changes the structure of the dom/area around it(destroy from the DOM, etc.).
  Stuctural directive are assigned with \* to know that they should be transformed.

For example:

```typescript
<div *ngIf="condition"></div>
```

_is transformed into:_

```typescript
<ng-template [ngIf]="condition">
	<div></div>
</ng-template>
```

- \*ngIf="" - doesn't place in DOM if not true

```typescript
<p *ngIf="serverCreated; else noServer">{{ creationStatus }}</p>

<ng-template #noServer>
  <p ng>No Server was created yet!</p>
</ng-template>
```

- ngStyle - attribute directive

```typescript
<p [ngStyle]="{ backgroundColor: getColor() }">
  Server w/ ID: {{ serverId }} is {{ getStatus() }}
</p>
```

- ngClass

```typescript
[ngClass]="{ "online": status === 'online' }"
```

-\*ngFor="let item of items; let i = index"

```typescript
<li
    *ngFor="let value of array"
>
    {{ value }}
</li>
```

-ngSwitch

```typescript
<div [ngSwitch]="conditionExpression">
    <div *ngSwitchCase="expression">output</div>
    <div *ngSwitchDefault>output2</div>
</div>
```

### Creating own directives

Creating custom directive is preovided with _Directive_ docorator, which accepts a selector name.
Then u have to initialize it in the constructor and u can access it in ngOnInit hook:

#### Attribute directive

```typescript
import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}

```

Also, do not forget to register it in module:

```typescript
declarations: [
    AppComponent,
    // directives
    BasicHighlightDirective
  ],
```

Better practice is not to change element directly, because in some circumstances u'll get some errors, but use _renderer_:

```typescript
constructor(private elRef: ElementRef, private renderer: Renderer2) {}

ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "orange"
    );
}
```

Also, u can listen for events and provide specific handler. This can be arranged w/ _HostListener_ decorator:
HostListener(eventName, args) - Decorator that declares a DOM event to listen for, and provides a handler method to run when that event occurs.

```typescript
@HostListener("mouseenter") mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "blue"
    );
  }
```

Even better approach is _HostBinding_ decorator.
It's decorator that marks a DOM property as a host-binding property and supplies configuration metadata. Angular automatically checks host property bindings during change detection, and if a binding changes it updates the host element of the directive.

```typescript
export class BetterHighlightDirective implements OnInit {
  @HostBinding("style.backgroundColor") backgroundColor: string = "blue";

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroundColor = "red";
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroundColor = "orange";
  }
}
```

U could, also, pass attributes to custom directive:

```typescript
<p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">
    Style me with better directive!
</p>
```

```typescript
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input() highlightColor: string = "blue";
  @HostBinding("style.backgroundColor") backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
```

Remove quotation marks:

```typescript
<p appBetterHighlight defaultColor="yellow" highlightColor="red">
    Style me with better directive!
</p>
```

#### Creating structural directive

```typescript
@Directive({
  selector: "[appUnless]"
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```

Setter should be the same as directive on th element:

```typescript
<div *appUnless="!condition">
</div>
```

## Debugging

You can debug your App by going to Source tab in developer tools, finding the row in the bundle which look similar to your ts code and click on it. Yout ts file will be opened and u can user debugger there.

But, it's better to use specific tools for it: **Angular Augury**.

## Services & Dependency Injection (_Core feature of Angular_)

Service is just normal class.
Dependency Injector - injects an instance of the class to out component automatically.
To require such instance add it to constructor and provide a type(required). And add it to providers of the component.

service.ts:

```typescript
export class LogginService {
  logStatusChange(status: string) {
    console.log("A server status changed, new status: " + status);
  }
}

```

usage:

```typescript
@Component({
  selector: "app-new-account",
  providers: [LoggingService]
})

constructor(private loggingService: LogginService){}
```

Ijectors are hierarchical, so if you provide service in parent component, the children will have accecss to this service as well. This service is passed down, but not up.
If you provide a service in the Module, the instance of the service will be available though out the whole module.

So, u can remove service from providers array of child components, but leave it in the constructor to let the component know that u will use it.

_To inject service into another serive u have to register it on more global level(module)._
_And provide Injectable decorator to the service u inject in:_

```typescript
import { LoggingService } from "./logging.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AccountsService {
  accounts = [];

  constructor(private loggingService: LoggingService) {}

  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.loggingService.logStatusChange(newStatus);
  }
}

```

Beginning with Angular 6.0, the preferred way to create a singleton service is to set providedIn to root on the service's @Injectable() decorator. This tells Angular to provide the service in the application root.

```typescript
@Injectable({providedIn: 'root'})
export class MyService { ... }

```

## Routing

First of all, u have to import ROutes and RouterModule from @angular/router and create routes array.

```typescript
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "servers",
    component: ServersComponent
  }
];
```

Register it in imports of the module:

```typescript
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
```

Router Link :

```typescript
<a routerLink="/users">Users</a>
```

or

```typescript
<a [routerLink]="['/users']">Users</a>
```

/users - absolute path
users - relative path

#### Specify active link

The RouterLinkActive directive toggles css classes for active RouterLink bindings based on the current RouterState.

```typescript
<li routerLinkActove="active" [routerLinkActiveOptions]="{exact: true}">
  <a routerLink="/users">Users</a>
</li>
```

[routerLinkActiveOptions]="{exact: true}" - if only the whole path is the same

#### Navigate programmatically:

Firstly, u have to inject router:

```typescript
constructor(private router: Router) {}

```

And user navigate on route instance, which accepts array of routes as a param:

```typescript
this.router.navigate(["servers"]);
```

If u're navigating to route w/ relative path like

```typescript
this.router.navigate(['servers'])
```

Nothing will happen cause router doesn't know on which route u're now, but routerLink does.
So, to tell on whick route u are u have to pass 2nd param - relativeTo and inject the active route.

```typescript
constructor(private route: ActivatedRoute) {}

this.router.navigate(["servers"], { relativeTo: this.route });
```

#### Fetching route params

Dynamically loaded component:

```typescript
{
    path: "users/:id/:name",
    component: UserComponent
},
```

So, in User Component u can access the params from active route:

```typescript
export class UserComponent implements OnInit {
  user: { id: number; name: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"]
    };
  }
}

```

But, the issue is that if params change, angular won't know about it cause component has already been initialized.
So, u have to watch these params. Params are observable and u can subscribe to them:

```typescript
 ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"]
    };
    this.paramsSubsribtion = this.route.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }
```

The subscribtion are cleaned by Angular automatically, but it's good to do cause u can provide your own observables.
So, it's better to unsubscribe:

```typescript
ngOnDestroy() {
    this.paramsSubsribtion.unsubscribe();
}
```

#### Querying params and fragment

**Passing params**
queryparams - ?
fragment - #
/servers/5/edit?allowEdit=1

```typescript
<a
    [routerLink]="['/servers', 5, 'edit']"
    [queryParams]="{ allowEdit: '1' }"
    fragment="loading"
    class="list-group-item"
    *ngFor="let server of servers"
>
    {{ server.name }}
</a>
```

Programmatically:

```typescript
onLoadServers(id: number) {
    this.router.navigate(["servers", id, "edit"], {
      queryParams: { allowEdit: "1" },
      fragment: "loading"
    });
}
```

**Retrieving**

1. U can access the snapshot of the route(this.route.snapshot.queryParams/fragment). But it won't be reactive, the same with params
2. U can access subscribe to queryParams and fragment of the route instance (this.route.fragment.subscribe())

```typescript
ngOnInit() {
    const id = +this.route.snapshot.params["id"];
    this.server = this.serversService.getServer(id);

    this.paramsSubscribtion = this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
    });
  }
```

_Note: all parans are string, so if u need int, u have to parse it._

#### Nested Routes

U can provide nested route with children property:

```typescript
{
    path: "servers",
    component: ServersComponent,
    children: [
      {
        path: ":id",
        component: ServerComponent
      },
      {
        path: ":id/edit",
        component: EditServerComponent
      }
    ]
  }
```

And then, in parent file add <router-outlet/>, where the children will be displayed.

To keep query params in the next route - add queryParamsHandling:

```typescript
this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve"
});
```

#### Redirecting:

```typescript
{
    path: "",
    component: HomeComponent
},
{
    path: "home",
    redirectTo: ""
},
```

#### Catch all routes, not provided in the App:

\*\* - wildcard

```typescript
{
    path: "**",
    component: PageNotFoundComponent
}
```

_NOTE:_
\*By default, Angular matches paths by prefix. That means, that the following route will match both /recipes and just /

{ path: '', redirectTo: '/somewhere-else' }

Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with '' (Important: That's no whitespace, it's simply "nothing").

To fix this behavior, you need to change the matching strategy to "full" :

{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }

Now, you only get redirected, if the full path is '' (so only if you got NO other content in your path in this example).\*

#### Outsourcing the Route Config

1. Move all routes ti app-routing.module.ts
2.

```typescript
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

3. Include route module in app module

#### Route Guards

1. Creating AuthGuard Service:
   It's a class that implements CanACtivate interface

```typescript
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = await this.authService.isAuthenticated();

    if (!isAuthenticated) this.router.navigate(["/"]);

    return true;
  }
}

```

2. Add this AuthGuard to canActivate property on the route:

```typescript
path: "servers",
component: ServersComponent,
canActivate: [AuthGuard]
```

**Protecting only child routes:**

```typescript
canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.canActivate(route, state);
}
```

Route:

```typescript
path: "servers",
component: ServersComponent,
canActivateChild: [AuthGuard],
children: []
```

#### Before leaving route:

Deactivate service :

```typescript
import { Observable } from "rxjs";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
```

Usage:

```typescript
canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if (condition) {
      return confirm("Do you want to discard changes?");
    } else {
      return true;
    }
  }
```

#### Pass static data vie route

U can specify it in data property on route object:

```typescript
{
    path: "404",
    component: ErrorMessageComponent,
    data: {
      message: "Page not Found!"
    }
}
```

#### Pass dynamic data

To make an http request before displaying the router u have to add a resolver.
Data will be fetched before the route is loaded. Alternative is to fetch data in ngOnInit.

```typescript
{
    path: ":id",
    component: ServerComponent,
    resolve: { server: ServerResolver }
}
```

ServerResolver.service.ts:

```typescript
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params["id"]);
  }
}
```

Server.component.ts:

```typescript
ngOnInit() {
    // Variant 1
    // const id = +this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(id);

    // this.paramsSubscribtion = this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params["id"]);
    // });

    // Variant 2
    this.route.data.subscribe((data: Data) => {
      this.server = data["server"];
    });
}
```

And get access to it from route instance:

```typescript
ngOnInit() {
    this.errorMessage = this.route.snapshot.data["message"];
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data["message"];
    });
}
```

#### Using hash config:

```typescript
[RouterModule.forRoot(appRoutes, {useHash: true})]
```

```typescript
{
    path: "new",
    component: RecipeEditComponent
},
{
    path: ":id",
    component: RecipeDetailComponent
},
```

If u place new after :id, Angular will try to parse "new" and u will got an error, so just swap these two routes.

## Observables

An observable represents a stream, or source of data that can arrive over time.

Observables provide support for passing messages between publishers and subscribers in your application. Observables offer significant benefits over other techniques for event handling, asynchronous programming, and handling multiple values.

As a publisher, you create an Observable instance that defines a subscriber function. This is the function that is executed when a consumer calls the subscribe() method. The subscriber function defines how to obtain or generate values or messages to be published.

To execute the observable you have created and begin receiving notifications, you call its subscribe() method, passing an observer. This is a JavaScript object that defines the handlers for the notifications you receive. The subscribe() call returns a Subscription object that has an unsubscribe() method, which you call to stop receiving notifications.

```typescript
const customIntervalObservable = Observable.create(observer => { //observer === listener
  let count = 0;

  setInterval(() => {
    observer.next(count); // next iteration
    if (count === 2) {
      observer.complete(); // finish listening
    }
    if (count > 3) {
      observer.error(new Error("Count is greater than 3")); // fire an error
    }
    count++;
  }, 1000);
});
```

Usage:

```typescript
this.counter = customIntervalObservable.subscribe(
  data => console.log(data), // callback that should be executed
  error => console.log(error), // error handler
  () => console.log("Completed !") // callback which if fired when observer is completed
);
```

**Subject** is more actively Observer and better approach than EventEmitter. U can call next on it;
Use Subjects to communicate across components, but use regular EventEmitter for parent-child communication.

```typescript
export class UserService {
  activatedEmitter = new Subject<boolean>();
}
```

Dispatch Event:

```typescript
this.userService.activatedEmitter.next(true);
```

Subscribe:

```typescript
this.userService.activatedEmitter.subscribe(
  (data: boolean) => {
    this.isActivated = data;
  }
);
```

#### Operators

Operators offer a way to manipulate values from a source, returning an observable of the transformed values.

1. pipe - The pipe function is the assembly line from your observable data source through your operators.
   For more examples look https://www.learnrxjs.io/learn-rxjs/operators.

Example:

```typescript
customIntervalObservable
  .pipe(
    filter((data: number) => {
      return data > 0;
    }),
    map((data: number) => {
      return "Round " + (data + 1);
    })
  )
  .subscribe(
    data => console.log(data),
    error => console.log(error),
    () => console.log("Completed !")
  );
```

## Forms

Angular offers two approaches:

1. Template-Driven(TD) - Angular infers the Form Object from the DOM
2. Reactive - Form is created programmatically and synchronized with the DOM.

### Template Driven

To tell Angular u are need an input add ngModel to it to be contolled and the name of this control:

```typescript
<input type="email" id="email" class="form-control" ngModel name="email" />
```

To get access to the form --> set ref on the form and assign ngForm to it, pass this ref to onSubmit:

```typescript
<form (ngSubmit)="onSubmit(form)" #form="ngForm"></form>
```

```typescript
onSubmit(form: NgForm) {
    console.log(form);
}
```

It will be the object with value property, which consists all _named_ inputs.

Another approach to acess the form is ViewChild():

```typescript
@ViewChild("form", { static: true }) signupForm: NgForm;
```

Angular add classes to inputs depending on valid field or not, was touched etc.

#### Validators:

Validators are directives.

- required
- minlength etc.
  All validators can be found here - https://angular.io/api/forms/Validators.

```typescript
<input
  type="email"
  id="email"
  class="form-control"
  ngModel
  name="email"
  required
  minlength="10"
/>
```

U can easily get access to the form in the template:

```typescript
<button class="btn btn-primary" type="submit" [disabled]="!form.valid">
  Submit
</button>
```

Styling invalid input when it was touched:

```typescript
input.ng-invalid.ng-touched {
  border: 1px solid #ff0000;
}
```

Access to the state of the input by providing ref w/ _ngModel_:

```typescript
<input
  type="email"
  id="email"
  class="form-control"
  ngModel
  name="email"
  required
  minlength="10"
  #email="ngModel"
/>
<span *ngIf="!email.valid && email.touched" class="help-block"
  >Please enter a valid value!</span>
```

_You can add a pattern to an input:_

```typescript
pattern="^[1-9]+[0-9]*$"
```

#### Default values:

Provide ngModel as directive and assign value to it (**One-way binding**):

```typescript
<select
    [ngModel]="'pet'" // also, it can be a variable
    name="secret"
  >
    <option value="pet">Your first Pet?</option>
    <option value="teacher">Your first teacher?</option>
  </select>
```

#### Grouping input

Can ba implemented with ngModelGroup

```typescript
<div id="user-data" ngModelGroup="userData">
	...inputs
</div>
```

Can be found in forms.controls. Also, the group is added specific classes on diff actions and has the same behaviors as regular inputs(was touched etc.).

**Rendering radio buttons**

```typescript
<div class="radio" *ngFor="let gender of genders">
  <label>
    <input type="radio" name="gender" ngModel [value]="gender" />
    {{ gender }}
  </label>
</div>
```

#### Setting and Patching Form Values

U can set values of the form invoking setValue on the form ref instance, but u have to set all values of the form,
so it's not convenient if u've already written down some values and then set the form values, cause all values would be overwritten.

```typescript
this.signupForm.setValue({
  userData: {
    userName: "Some name",
    email: "",
    ...otherInputValues
  },
  ...otherGroups
});
```

So, the better approach is to access the form object on the signupForm ref and use _patchValue()_ method
and set only specific value:

```typescript
this.signupForm.form.patchValue({
      userData: {
        userName: suggestedName
      }
    });
```

#### Resetting form

All values, classes, states will be resetted. Just call reset on the form:

```typescript
 this.signupForm.form.reset();
```

_Also, u can pass an object to reset to specific values_

### Reactive

Form is created programmatically and synchronized with the DOM.
First of all, import ReactiveFormsModule in app.module.ts, regular FormsModules is used in Template Driven approach.
Form can be created w/ FormGroup() constructor, which requires an object w/ your custom fields, validators and etc.

```typescript
this.signupForm = new FormGroup({})
```

To synhronize with the form in template add formGroup directive:

```typescript
<form [formGroup]="signupForm"></form>
```

**Setting up fields**
Field can be created with FormControl() constructor, which accepts the default value:

```typescript
this.signupForm = new FormGroup({
  username: new FormControl("Default username"),
});
```

To synchronize it with the template add formControlName directive:

```typescript
<input
    type="text"
    id="username
    formControlName="username"
/>
```

_To get the access to the form in code u don't have to pass any references cause it's initialized programmatically in ts_
_It's actually has the same structure as in TD approach_

##### Validation

Validator can be passed as a 2nd param to FormControl:

```typescript
  username: new FormControl("Default username", Validators.required),
  // also u can pass an array of validators:
  email: new FormControl(null, [Validators.required, Validators.email])

```

#### Nested forms

Form is declared in FormGroup() constructor not depending it's form or part of form:

```typescript
this.signupForm = new FormGroup({
  userData: new FormGroup({
    username: new FormControl("Default username", Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email])
  }),
  gender: new FormControl("male")
});
```

Add formGroupName in the template:

```typescript
<form [formGroup]="signupForm">
    <div formGroupName="userData">
        <div class="form-group">
            <input
              type="text"
              id="username"
              class="form-control"
              formControlName="username"
            />
        </div>
    </div>
</form>
```

#### Getting access to controls:

Using method get('control-name') u can access the state of the control:

```typescript
<span
  *ngIf="
    !signupForm.get('userData.username').valid &&
    signupForm.get('userData.username').touched
  "
  >Please enter a valid username!</span
>
```

#### Array of Form Controls

Form:

```typescript
this.signupForm = new FormGroup({
  hobbies: new FormArray([])
});
```

Template:

```typescript
<div formArrayName="hobbies">
  <h4>Your Hobbies</h4>
  <button class="btn btn-default" type="button" (click)="addHobby()">
    Add Hobby
  </button>
  <div
    class="form-group"
    *ngFor="
      let hobbyControl of signupForm.get('hobbies').controls;
      let i = index
    "
  >
    <input type="text" class="form-control" [formControlName]="i" />
  </div>
</div>
```

.ts:

```typescript
addHobby() {
    (<FormArray>this.signupForm.get("hobbies")).push(
      new FormControl(null, Validators.required)
    );
}
```

_FormArray has removeAt and clear methods:_

```typescript
(this.recipeForm.get("ingredients") as FormArray).removeAt(index); // removespecific FormControl
```

```typescript
(this.recipeForm.get("ingredients") as FormArray).clear(); // removes all FormControls
```

#### Custom Validators

Add custom validator function in the array of validators and bind the context:

```typescript
username: new FormControl("Default username", [
  Validators.required,
  this.forbiddenNames.bind(this)
]),
```

forbiddenNames():

```typescript
forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1)
      return {
        nameIsForbidden: true
      };

    return null;
}
```

**Validator should return an object or null.**
_Handling errors:_

```typescript
<span
  class="helper-block"
  *ngIf="
    signupForm.get('userData.username').errors &&
    signupForm.get('userData.username').errors.nameIsForbidden
  "
  >This name is forbidden!</span
>
```

##### Async Validator

Is passed as the 3rd param to the FormContols:

```typescript
email: new FormControl(
  null,
  [Validators.required, Validators.email],
  this.forbiddenEmails.bind(this)
)
```

forbiddenEmails returning promise(server response simulation):

```typescript
forbiddenEmails(control: FormControl): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true }); // return object if error
        } else {
          resolve(null); // return null if no error
        }
      }, 1000);
    });

    return promise;
}
```

#### Reacting to Status and Value Changes

The form has two Observables:

- valueChanges - fires when any of form's value is changed
- statusChanged - status of the form:
  - INVALID
  - VALID
  - PENDING (async validtor handling)

```typescript
this.signupForm.statusChanges.subscribe((value) => {})
```

#### Setting and Patching and Resetting Reactive Form

The same as in TD approach

```typescript
this.signupForm.setValue({ // Changing the whole form
  userData: {
    username: "Test",
    email: 'email
    ....
  }
})

this.signupForm.patchValue({ // Changing separate value
  userData: {
    username: "Adam"
  }
});
```

**As a best practive u can separate the validator logic and move to anothe file:**

```typescript
export class CustomValidators {
	static invalidProjectName() {}
}
```

## Pipes
Pipes are used to transform data.
Usage: value | pipe
| - pipe symbol
```typescript
{{server.status | uppercase}}
```
Built-in pipes:
- uppercase
- date
- titlecase
- decimal
- slice etc.
All pipes can be viewed: https://angular.io/api?type=pipe

### Configure pipes:
```typescript
{{server.started | date:'fullDate'}}
```

### Chaining pipes:
```typescript
{{server.started | date:'fullDate' | uppercase}}
```
The order of the pipes are important, cause it;is applied in sequence

### Creating own pipe
Provide Pipe() decorator than accepts name of the pipe.
shorten.pipe.ts:
PipeTransform - interface than include transform method, which accepts the value and param
```typescript
@Pipe({
	name: "shorten"
})
export class ShortenPipe implements PipeTransform {
	transform(value: any, param:number, anotherArg) {
    	return value.substr(0, param) + anotherArg
    }
}
```
app.module.ts:
```typescript
declarations: [
	AppComponent,
    ShortenPipe
]
```
Usage:
```typescript
{{value | shorten:5:' ...'}}
```

Also, u can use pipes on arrays (especially, for filterring purposes):
```ts
<div *ngFor="let item of arr | filter: filteredStatus:'status'"></div>
// filterStatus - ngModel input
// status - prop of object in the array 
```

*Note: Angular is not rerunning the pipe when data changes(array or object data), cause it will cause performance issues*
*So, if u want to force it, add pure: false to Pipe decorator:*
```ts
@Pipe({
	name: "shorten",
    pure: false // recalculate if anything is changed
})
```

### Async Pipes
Adding an async pipe u make Angular to watch changes and outpup the data when it will be resolved. 
```ts
{{status | async}}
```


## HTTP
First of all, u have to import HttpClientModule in app.module.ts
Then to use httpClient add it in the constructor:
```ts
constructor(private http: HttpClient) {}
```

Sending a request:
```ts
this.http
    .post("https://xxx/posts.json", postData)
    .subscribe(responseData => {
        console.log(responseData);
    });
```
If u are not subscribing, Angular thinks u don't need the response, that's why it doesn't send a request even.

### Using Rxjs to transform data:
```ts
this.http
    .get("https://xxx/posts.json")
    .pipe(
    map(responseData => {
      const posts = [];

      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          posts.push({ ...responseData[key], id: key });
        }
      }

      return posts;
    })
    )
    .subscribe(posts => {
        console.log(posts);
    });
```

### Typing
U can specify response generetic type on http method in order to set the response type:
```ts
this.http
  .post<{name: string}>("https://xxx/posts.json", postData)
  .subscribe(responseData => {
    console.log(responseData);
  });
```

### Using service for Http Requests
Return the Observable and subscribe in the component.
```ts
fetchPosts() {
    return this.http
      .get<{ [key: string]: PostModel }>(
        "https://angular-98a53.firebaseio.com/posts.json"
      )
  }
```

### Handling error
In subscribe function u can pass an error handler as a second param:
```ts
his.postService.fetchPosts().subscribe(
  posts => {
    this.loadedPosts = posts;
    this.isFetching = false;
  },
  error => {
    this.error = error.message;
    this.isFetching = false;
  }
);
```

### Setting Header and Query Params
```ts
this.http
  .get<{ [key: string]: PostModel }>(
    "https://angular-98a53.firebaseio.com/posts.json",
    {
      headers: new HttpHeaders({
        "Custom-Header": "Hello"
      }),
      params: new HttpParams().set('print', 'pretty') // ?print=pretty
    }
  )
```
*To set multiple params u can create new HttpParams intance and append the params there:*
```ts
const searchParams = new HttpParams();
searchParams = searchParams.append('print', 'pretty');
searchParams = searchParams.append('custom', 'key');
```

### Observing different types of Response
U can change the way the data is parsed by adding an extra argument:
```ts
this.http
  .post<{ name: string }>(
    "https://angular-98a53.firebaseio.com/posts.json",
    postData,
    {
      observe: 'response'
    }
  )
```
observe values:
 - response - u can access th headers, status, statusText, body etc.
 - body - regular response body
 - events - event types 
 ```ts
this.http
  .delete("https://angular-98a53.firebaseio.com/posts.json", {
    observe: "events"
  })
  .pipe(
    tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    })
  );
```

### Response type:
By providing the type of response angular will transform in type u set.
```ts
.delete("https://angular-98a53.firebaseio.com/posts.json", {
    observe: "events",
    responseType: 'json' //text, blob, etc.
  })
```

### Interceptors:
Registering Interceptor in app module:
```ts
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
]
```
Interceptor Service:
```ts
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url === "do not make request") {
      //...
    }

    const modifiedRequest = req.clone({
      url: "some-new-url",
      headers: req.headers.append('Auth', 'xxx')
    });

    return next.handle(modifiedRequest);
  }
}
```
#### Detetcting Response/Request interceptors:
```ts
return next.handle(modifiedRequest).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log("Response arrived, body - ", event.body);
        }
      })
    );
```
#### Multiple interceptors
The order of interceptors is important, cause it's the order they will be executed:
```ts
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogginInterceptorService,
      multi: true
    }
]
```

## Authentication
Auth service:
```ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://...",
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  singin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://...",
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/auth"]);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "Some Error Occured";

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "User w/ such email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "User w/ such email doesn't exist";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid password";
        break;
    }

    return throwError(errorMessage);
  }
}

```

To check if user was logged in whe app is loaded:
```ts
ngOnInit() {
    this.authService.autoLogin();
}
```

Submit function:
```ts
onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.singin(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    this.resetForm();
  }
```

Interceptor:
```ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) return next.handle(req); // if no user - for signin/signup

        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token) // setting token from user for every request
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
```

Auth guard:
```ts
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        // return !!user;
        const isAuth = !!user;

        return isAuth ? true : this.router.createUrlTree(["/auth"]);
      })
      // 1st approach
      //   tap(isAuth => {
      //     if (!isAuth) {
      //       this.router.navigate(["/auth"]);
      //     }
      //   })
    );
  }
}
```

*Note: do not forget to register Guard and Interceptor!*

## Dynamic Components
Means u want to display component dynamically and are controlled programmatically, for example by ngIf.

Another approach which is already not supported is Dynamic Component Loader. Component created and added to DOM via code. 

### Programmatic Creation
To create component:
1. Inject ComponentFactoryResolver instance:
```ts
constructor(private componentFactoryResolver: ComponentFactoryResolver){}
```
2. Create component factory:
```ts
const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
```
3. Add place in template with a ref:
```ts
<ng-template appPlaceholder></ng-template>
```
appPlaceholder directive:
```ts
import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "[appPlaceHoder]" })
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
```
4. Create ref on the place in the DOM to insert to:
```ts
const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
const hostViewContainerRef = this.alertHost.viewContainerRef; // ref
hostViewContainerRef.clear(); // clear everything was rendered there

hostViewContainerRef.createComponent(alertCmpFactory); // create component
```

## Optimization & NgModules

## Deployment

## Animations & Testing

## Other

### Adding model

```typescript
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }
}

```

Shortcut:

```typescript
export class Recipe {

  constructor(public name: string, public desc: string, public imagePath: string) {}
}
```
