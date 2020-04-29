# Angular building blocks part 1

During this introduction, we are leading you through the basic building blocks of angular. More specificly, we are going to discuss:

1. Modules
2. Components
3. Templates
4. Directives
5. Pipes

Then, in part 2, we will discuss:

1. Services
2. Routing

## Setup

We expect that you followed the angular hello-world local setup: https://angular.io/guide/setup-local.

After the setup, we have a standard Angular application, which contains a set of modules, components and templates.

We won't worry too much about all of the files that angular generates, only about the highlighted parts in the following image:

![](./generated_files.png)

We are only interested in the files that are highlighted.
For now, we are even skipping the `package.json` and `README.md` files. Just know that we will visit them in the future.

## Modules

Modules are comparable to packages, namespaces, but more generically a `Collection` of functionality. More specifically, a `Module` consists of several:

- Component `declarations`
- `Bootstrap` components
- `Imports` (of other modules)
- `Exports` (of modules, but also of components)
- Services that it `provides` for you to use inside this module.

A module itself does not contain any logic or functionality, it is just a bundle of the things denoted above.

Any angular application has one **root** module. In the case of the generated angular app, this is the `AppModule`. Let's find it and have a look. You can find the `AppModule` defined at the following location: `src/app/app.module.ts`.
The contents are like this:

```TypeScript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The module is annotated with a `@NgModule` metadata decorator which contains information about how to compile this module. In the case of the module, that is actually all there is. The class `AppModule` itself is completely empty.

As you can see, we have only one component that we `declare` and `bootstrap`. Note that `bootstrapping` only is done for the components that are used as main component, or in case of a popup, for example. If you were to make another component, there is no need to add it to the `bootstrap` array as well. We do however need to add it to the `declarations` array.

We `import` the `BrowserModule` by default, which contains the most basic functionality. If we want to add more functionality outside of it, we need to import other modules ourselves.

## Components

If you start your application and navigate to http://localhost:4200, you will see the default angular `HTML` page.
What you see originates from the default app component, which you can find in the following location: `src/app/app.component.html`. This page contains quite a lot of content to guide you to some sources of information. This is our root page, and this is where we start working.

Why is this actually the page that is shown? The answer lies in the fact that this component is `bootstrapped` in the `NgModule`, **and** is included in the `src/index.html` like this:

```HTML
<body>
  <app-root></app-root>
</body>
```

Now, knowing that, take a look at the `AppComponent` (`src/app/app.component.ts`):

```TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'tutorial';
}
```

As you can see, the `AppComponent` a own metadata decorator, `@Component`, which is used on every `Component`.

- `selector` defines the name of this component, which means that you can show this component using `<app-root></app-root>` as we saw before.
- `templateUrl` defines where angular should look for the template that belongs to this `Component`. This needs to refer to an `html` file.
- `styleUrls` can be used to bind css files (yes, plural :) ) to this component.

## Component template binding

Let's get our hands dirty. First, remove all the content from `app.component.html`. We need to start over to have a clear view on what we are doing.
To show something like a variable in your template, you can use the following angular syntax:

```html
<h1>{{title}}</h1>
```

Next to the `<h1>` tags which should be familiar to you, we introduce the `{{title}}` syntax here.
What this means, is that you 'bind' the `title` variable inside the `AppComponent` to the DOM (Document Object Model), or in other words, your website. This means that your website should display whatever the value of `title` is on your website. Check it out!

### Events

To use events in angular, we use a different syntax:

```html
<button (click)="changeTitle()">Click me!</button>
```

This simply means that whenever the user clicks on the button, the `changeTitle` function will be executed.

**NOTE** that since we are currently in the `AppComponent` template (`app.component.html`), we can only execute functions that are defined inside the `AppComponent`.
To be able to make this work, we need to add the `changeTitle` to the `app.component.ts`:

```TypeScript
export class AppComponent {
  public title = 'tutorial'; // your app's name is also fine ;)
  public changeTitle(): void {
    this.title = 'hi, we changed the title!';
  }
}
```

Now, as soon as we click the button, we can see that the `title` variable has changed, which will change the value inside our `<h1>` in the template.
This is a really cool concept. Whenever a variable changes that has been bound to our DOM, angular will automatically update the display of that variable in your template.

## Creating our own component

Creating a new component is easy, since the angular cli was introduced.
To create a new component, you only have to type the following:
`ng generate component your-name`, where `your-name` is the name of the component (in `kebab-case`).

Angular will generate all the necessary files for you in a seperate folder, as well as add the component to the `declarations` array in your `Module`.

Try it out!

If you want to include it in your application, you can use the same name as is used to create the component. For example, if you created a component called `your-name`, you can use it in your `app.component.html` like this:

```html
<your-name></your-name>
```

Then, on runtime, the template of the `YourNameComponent` will be shown there.

## Directives

Directives in angular are pieces of logic that you can apply to elements. You can see a directive as a `component` without a template attached to it.

There are two different types of directives: Structural directives and attribute directives.

### Structural directives

Structural directives are directives that change the DOM in a structual way. What we mean by this is that they hide elements, or construct them for example.

There are structural directives defined by the angular framework. The most common are:

1. `*ngIf`
2. `*ngFor`
3. `[ngSwitch]`

Let's fiddle around a bit with the `*ngIf` and the `*ngFor`.

#### ngIf

To demo the `*ngIf`, we can do something simple in any template that is shown (either `app.component.html` or the one you created yourself):

```html
<h1 *ngIf="true">This is shown!</h1>
<h1 *ngIf="false">This is not shown!</h1>
```

Note that the `*ngIf="true"` is totally nonsensical to use, since leaving it out entirely would yield the same result. This is only for demonstration purposes.

Try it out!

#### ngFor

The `*ngFor` directive can be used to easily show all the items in an array.
To play around with this, add the following array to any component:

```typeScript
public cars = ['BMW', 'Audi', 'Tesla'];
```

Then, in the corresponding template, add the following:

```html
<ul>
  <li *ngFor="let car of cars">{{car}}</li>
</ul>
```

Try it out!

### Attribute directives

Attribute directives are for adding specific logic to any element. These are the kind of directives that you are likely to one day create yourself.

To try that ourselves, we can use the angular cli again to generate a new `directive`:

```
ng generate directive my-directive
```

This will generate our own directive and `declare` it in the module.

The standard angular example is to make a highlight directive (which is, of course, utterly useless since we could do something like that more efficiently with CSS). The true value of a directive is that you can do anything that you can think of with the element that you apply it to, not just changing some styles.

Change your directive to this:

```TypeScript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyDirective]',
})
export class MyDirectiveDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

As you can see, the selector is `[appMyDirective]`. The square brackets indicate that it is not to be used as a tag, but as an `attribute`.

Let's see it in action!

Inside your `app.component.html`, add the following:

```html
<h1 appMyDirective>Test!</h1>
```

This should show up as a heading with a beautiful yellow background.

## Pipes

Pipes are very powerful, yet most of the time extremely simple operators. Pipes can be used to transform the display of a certain variable.

There are a lot of built-in pipes. For example:

1. date
2. async
3. currency
4. lowercase
5. uppercase
6. titlecase
7. Many, many more.

We can also define it ourselves, but we'll leave that for later.

#### How do you use a pipe?

Say, you have the following fields in your component:

```TypeScript
  public nowDate = new Date();
  public someString = 'Hi, this is a string!';
  public currencyExample = 23.53;
```

Now, in the template, add the following:

```html
<p>
  {{ nowDate }}
</p>
<p>
  {{ nowDate | date }}
</p>
<p>
  {{ nowDate | date: "dd-MM-yyyy" }}
</p>
<p>
  {{ currencyExample }}
</p>
<p>
  {{ currencyExample | currency: "€" }}
</p>
<p>
  {{ currencyExample | currency: "€" }}
</p>

<p>
  {{ someString }}
</p>
<p>
  {{ someString | lowercase }}
</p>
<p>
  {{ someString | uppercase }}
</p>
<p>
  {{ someString | uppercase | lowercase | titlecase }}
</p>
```

Now, you can see the different effects and uses of the most common pipes. they are just applied to the value and the resulting value is shown, not the original.
