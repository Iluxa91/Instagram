import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './services/auth.service'
import { BeautyLoggerService } from './services/beauty-logger.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from './interceptors/credentials.interceptor'
import { AuthGuard } from './guards/auth.guard'
import { NotificationService } from './services/notification.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    BeautyLoggerService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthGuard,
    NotificationService,
  ],
})
export class CoreModule {}
