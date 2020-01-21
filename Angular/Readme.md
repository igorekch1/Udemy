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

## Debugging

You can debug your App by going to Source tab in developer tools, finding the row in the bundle which look similar to your ts code and click on it. Yout ts file will be opened and u can user debugger there.

But, it's better to use specific tools for it: **Angular Augury**.

## Services & Dependency Injection

_Core feature of Angular_

## Routing

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
