import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SignupComponent } from './views/SignupForm/signup/signup.component';
import { TestcategoryComponent } from './views/Test/testcategory/testcategory.component';
import { QuestionSetupComponent } from './views/question-setup/question-setup.component';
import { CbtComponent } from './views/cbt/cbt.component';
import { DayoTestComponent } from './views/dayo-test/dayo-test.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { UserdetailsComponent } from './views/userdetails/userdetails.component';
import { ThankyouComponent } from './views/thankyou/thankyou.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { TimerComponent } from './views/timer/timer.component';
import { InternalstudentComponent } from './views/internalstudent/internalstudent.component';
import { CounselComponent } from './views/counsel/counsel.component';
import { SchoolsetupComponent } from './views/schoolsetup/schoolsetup.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Sign Up Page'
    }
  },

  {
    path: 'thankyou',
    component: ThankyouComponent,
    data: {
      title: 'Thank you Page'
    }
  },
  {
    path: 'category',
    component: TestcategoryComponent,
    data: {
      title: 'Test Category'
    }
  },

  {
    path: 'report',
    component: DayoTestComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Result Page'
    }
  },
  {
    path: 'question',
    component: QuestionSetupComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Question Bank'
    }

  },
  {
    path: 'user',
    component: UserdetailsComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'User Details'
    }

  },
  {
    path: 'test',
    component: CbtComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Computer Based Test'
    }
  },

  {
    path: 'home',
    component: HomepageComponent,
    data: {
      title: 'Home Page Test'
    }
  },

  {
    path: 'create',
    component: SchoolsetupComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Create School'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'timer',
    component: TimerComponent,
    data: {
      title: 'Timer Page'
    }
  },
  {
    path: 'internal',
    component: InternalstudentComponent,
    data: {
      title: 'LMS Page'
    }
  },
  {
    path: 'counsel',
    component: CounselComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Counsel Page'
    }
  },
 

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
