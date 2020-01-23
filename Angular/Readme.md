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

```
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

```
ng generate component [name] or ng g c [name]
```

### Inline Template and CSS

Replace templateUrl w/ just template and provider specific template there.

```
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

```
selector: "app-servers"

<app-servers></app-servers>
```

2. By attribute

```
selector: "[app-servers]"

<div app-servers></div>
```

3. By class

```
selector: ".app-servers"

<div class=".app-servers"></div>
```

Also, you can provide inline CSS using styles instead of styleUrls. It will have higher priority cause it's inline styles:

```
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

```
<app-server-element
      >
    <p>Children</p>
</app-server-element>
```

server-element.component.ts:

```
<div>
    <ng-content></ng-content> // <p>Children</p>
</div>


```

## DataBinding

```
export class TestCmp {
  data: Interface = {};
}

<p>{{ data }} - String interpolation</p>
```

### Property binding

To use property binding put an attribute in brackets:

```
<button class="btn btn-primary" [disabled]="!allowAdd">Add</button>
```

### Event Binding

Provide event in curly braces and a function to execute.

```
<button
  (click)="onCreate()"
>
  Add
</button>
```

Passing an event object w \$event:

```
<input type="text" class="form-control" (input)="onUpdateServerName($event)" />
```

### Two-Way data binding

Combines both event and property binding:

```
<input type="text" class="form-control" [(ngModel)]="someField" />
```

### Property binding

#### From parent to Child

To pass prop to child component you have to bind it on component you want to pass it to:

```
app-server-element
    *ngFor="let serverElement of serverElements"
    [element]="serverElement"
></app-server-element>
```

And in child component you have to add _Input_ decorator to this prop:

```
  @Input() element: { type: string; name: string; content: string };

```

#### Assinging an Alias

```
[srvElement]="serverElement"


@Input("srvElement") element: { type: string; name: string; content: string };
```

#### From Child to Parent

Using EventEmitter:

1. Bind custom event on child component:

```
<app-cockpit
    (serverCreated)="onServerAdded($event)"
></app-cockpit>
```

2. In child component declare this event:

```
@Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>(); // call a constructor
```

3. Emit an event from child component:

```
this.serverCreated.emit({
  serverName: this.newServerName,
  serverContent: this.newServerContent
});
```

4. Handle it in parent component:

```
onServerAdded(serverData: { serverName: string; serverContent: string }) {
    // do some stuff
  }
```

#### Assinging an Alias

Pass named event to child component and listen to it providing the same name to Output decorator parameter.

```
<app-cockpit
    (bpCreated)="onBluePrintAdded($event)"
></app-cockpit>

@Output("bpCreated") bluePrintCreated = new EventEmitter<{}>();
```

### Styles

Angular encapsulating css files and they are applied only for that component which css file belongs to.
Angular adds the same attribute to all DOM elements of the component, so that's why styles provided in component.css applies only to this component. It emulates Shadow DOM in such way cause old browsers do not support Shadow DOM.

To turn of style encapsulation you have to provide _encapsulation field_ and set it to ViewEncapsulation.None. Styles of this component will global.

```
@Component({
  encapsulation: ViewEncapsulation.None // Native, Emulated (default)
})
```

### Local Reference

U can privide reference with #name and use it only in template where it was defined.

```
    <input type="text" class="form-control" #serverNameInput />
    <button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
```

The ref is DOM element, so if u want to extract a value you can access it on the ref.value:

```
onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value
    });
  }
```

### Getting access to template

Alternativly to local references, u can use @ViewChild decorator, instead.
@ViewChild('selector', {static : bool}). static param will be removed in Angular 9.

```
<input type="text" class="form-control" #serverContent />
```

.ts:

```
@ViewChild("serverContent", { static: true }) serverContentInput: ElementRef;
```

Type - ElementRef. Access to value:

```
this.serverContentInput.nativeElement.value
```

Also, u can set ref on the Component:

```
<color-sample
  #primaryColorSample
</color-sample>

@ViewChild('primaryColorSample')
  sample: ColorSampleComponent;
```

If u want to write component initialization code that uses the references injected by @ViewChild, u need to do it inside the AfterViewInit lifecycle hook:

```
@ViewChild(ColorSampleComponent)
  primarySampleComponent: ColorSampleComponent;

  ngAfterViewInit() {
    console.log("primaryColorSample:", this.primarySampleComponent);
  }
```

### Children

To pass children to a component u can use specific directive _ng-model_

```
<app-server-element>
   <p>Children</p>
</app-server-element>
```

server-element.component.ts

```
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

```
<div *ngIf="condition"></div>
```

_is transformed into:_

```
<ng-template [ngIf]="condition">
	<div></div>
</ng-template>
```

- \*ngIf="" - doesn't place in DOM if not true

```
<p *ngIf="serverCreated; else noServer">{{ creationStatus }}</p>

<ng-template #noServer>
  <p ng>No Server was created yet!</p>
</ng-template>
```

- ngStyle - attribute directive

```
<p [ngStyle]="{ backgroundColor: getColor() }">
  Server w/ ID: {{ serverId }} is {{ getStatus() }}
</p>
```

- ngClass

```
[ngClass]="{ "online": status === 'online' }"
```

-\*ngFor="let item of items; let i = index"

```
<li
    *ngFor="let value of array"
>
    {{ value }}
</li>
```

-ngSwitch

```
<div [ngSwitch]="conditionExpression">
    <div *ngSwitchCase="expression">output</div>
    <div *ngSwitchDefault>output2</div>
</div>
```

### Creating own directives

Creating custom directive is preovided with _Directive_ docorator, which accepts a selector name.
Then u have to initialize it in the constructor and u can access it in ngOnInit hook:

#### Attribute directive

```
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

```
declarations: [
    AppComponent,
    // directives
    BasicHighlightDirective
  ],
```

Better practice is not to change element directly, because in some circumstances u'll get some errors, but use _renderer_:

```
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

```
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

```
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

```
<p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">
    Style me with better directive!
</p>
```

```
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

```
<p appBetterHighlight defaultColor="yellow" highlightColor="red">
    Style me with better directive!
</p>
```

#### Creating structural directive

```
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

```
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

```
export class LogginService {
  logStatusChange(status: string) {
    console.log("A server status changed, new status: " + status);
  }
}

```

usage:

```
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

```
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

```
@Injectable({providedIn: 'root'})
export class MyService { ... }

```

## Routing

First of all, u have to import ROutes and RouterModule from @angular/router and create routes array.

```
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

```
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
```

Router Link :

```
<a routerLink="/users">Users</a>
```

or

```
<a [routerLink]="['/users']">Users</a>
```

/users - absolute path
users - relative path

#### Specify active link

The RouterLinkActive directive toggles css classes for active RouterLink bindings based on the current RouterState.

```
<li routerLinkActove="active" [routerLinkActiveOptions]="{exact: true}">
  <a routerLink="/users">Users</a>
</li>
```

[routerLinkActiveOptions]="{exact: true}" - if only the whole path is the same

#### Navigate programmatically:

Firstly, u have to inject router:

```
constructor(private router: Router) {}

```

And user navigate on route instance, which accepts array of routes as a param:

```
this.router.navigate(["servers"]);
```

If u're navigating to route w/ relative path like

```
this.router.navigate(['servers'])
```

Nothing will happen cause router doesn't know on which route u're now, but routerLink does.
So, to tell on whick route u are u have to pass 2nd param - relativeTo and inject the active route.

```
constructor(private route: ActivatedRoute) {}

this.router.navigate(["servers"], { relativeTo: this.route });
```

#### Fetching route params

Dynamicallu loaded component:

```
{
    path: "users/:id/:name",
    component: UserComponent
},
```

So, in User Component u can access the params from active route:

```
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

```
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

```
ngOnDestroy() {
    this.paramsSubsribtion.unsubscribe();
}
```

#### Querying params and fragment

**Passing params**
queryparams - ?
fragment - #
/servers/5/edit?allowEdit=1

```
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

```
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

```
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

```
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

```
this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve"
});
```

#### Redirecting:

```
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

```
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

```
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

```
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

```
path: "servers",
component: ServersComponent,
canActivate: [AuthGuard]
```

**Protecting only child routes:**

```
canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.canActivate(route, state);
}
```

Route:

```
path: "servers",
component: ServersComponent,
canActivateChild: [AuthGuard],
children: []
```

#### Before leaving route:

Deactivate service :

```
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

```
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

```
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

```
{
    path: ":id",
    component: ServerComponent,
    resolve: { server: ServerResolver }
}
```

ServerResolver.service.ts:

```
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

```
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

```
ngOnInit() {
    this.errorMessage = this.route.snapshot.data["message"];
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data["message"];
    });
}
```

#### Using hash config:

```
[RouterModule.forRoot(appRoutes, {useHash: true})]
```

## Observables

## Forms

## Pipes

## HTTP

## Authentication

## Optimization & NgModules

## Deployment

## Animations & Testing

## Other

### Adding model

```
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

```
export class Recipe {

  constructor(public name: string, public desc: string, public imagePath: string) {}
}
```
