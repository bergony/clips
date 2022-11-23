import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TabsContainerComponent } from './tabs-container.component';
import { TabComponent } from '../tab/tab.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-tabs-container>
      <app-tab title="tab1">Tab 1</app-tab>
      <app-tab title="tab2">Tab 2</app-tab>
    </app-tabs-container>
  `,
})
class TestHostComponent {}

describe('TabsContainerComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabsContainerComponent, TabComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tabs', () => {
    const tabs = fixture.debugElement.queryAll(By.css('li'));
    const containerComponent = fixture.debugElement.query(
      By.directive(TabsContainerComponent)
    );
    const tabsProd = containerComponent.componentInstance.tabs;

    expect(tabs.length).withContext('Tabs dit not render').toBe(2);
    expect(tabsProd.length)
      .withContext('Could not grab component proprerty')
      .toBe(2);
  });
});
