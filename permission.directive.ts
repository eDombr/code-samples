import { PermissionService } from './../../core/services/permission.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ngxPermission]'
})
export class PermissionDirective {

    @Input()
    set ngxPermission(value: string) {
        this.viewContainer.clear();

        if (this.permissionService.checkPermission(value)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private permissionService: PermissionService) {
    }
}
