"use strict";
(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["main"],{

/***/ 3696:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _plantilla_error_error_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plantilla/error/error.component */ 1017);
/* harmony import */ var _plantilla_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plantilla/inicio/inicio.component */ 8153);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);





const routes = [
    {
        path: "inicio",
        component: _plantilla_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_1__.InicioComponent
    },
    {
        path: "",
        pathMatch: 'full',
        redirectTo: '/inicio'
    },
    {
        path: 'seguridad',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_modulos_seguridad_seguridad_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./modulos/seguridad/seguridad.module */ 9097))
            .then(x => x.SeguridadModule)
    },
    {
        path: 'administracion',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_modulos_administracion_administracion_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./modulos/administracion/administracion.module */ 9462))
            .then(x => x.AdministracionModule)
    },
    {
        path: 'solicitudes',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_modulos_solicitudes_solicitudes_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./modulos/solicitudes/solicitudes.module */ 342))
            .then(x => x.SolicitudesModule)
    },
    {
        path: "**",
        component: _plantilla_error_error_component__WEBPACK_IMPORTED_MODULE_0__.ErrorComponent
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 2050:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _plantilla_barra_navegacion_barra_navegacion_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plantilla/barra-navegacion/barra-navegacion.component */ 8008);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _plantilla_pie_pagina_pie_pagina_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plantilla/pie-pagina/pie-pagina.component */ 1398);




class AppComponent {
    formatLabel(value) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }
        return value;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 8, vars: 0, consts: [["href", "../../node_modules/@angular/material/prebuilt-themes/purple-green.css"], [1, "mat-app-background"], [1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Hogar Colombia");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "link", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "app-barra-navegacion");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "app-pie-pagina");
    } }, directives: [_plantilla_barra_navegacion_barra_navegacion_component__WEBPACK_IMPORTED_MODULE_0__.BarraNavegacionComponent, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet, _plantilla_pie_pagina_pie_pagina_component__WEBPACK_IMPORTED_MODULE_1__.PiePaginaComponent], styles: ["mat-slider[_ngcontent-%COMP%] {\n  width: 300px;\n}\n\nmat-form-field.mat-form-field[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZUFBZTtBQUNqQiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1zbGlkZXIge1xuICB3aWR0aDogMzAwcHg7XG59XG5cbm1hdC1mb3JtLWZpZWxkLm1hdC1mb3JtLWZpZWxkIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufSJdfQ== */"] });


/***/ }),

/***/ 4750:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 3696);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 2050);
/* harmony import */ var _plantilla_barra_navegacion_barra_navegacion_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plantilla/barra-navegacion/barra-navegacion.component */ 8008);
/* harmony import */ var _plantilla_pie_pagina_pie_pagina_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plantilla/pie-pagina/pie-pagina.component */ 1398);
/* harmony import */ var _plantilla_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plantilla/inicio/inicio.component */ 8153);
/* harmony import */ var _plantilla_error_error_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plantilla/error/error.component */ 1017);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ 2650);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap/modal */ 4428);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slider */ 5291);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 8359);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 1036);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/radio */ 7435);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/card */ 8662);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/layout */ 9339);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/toolbar */ 7727);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/sidenav */ 1986);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/list */ 4021);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/table */ 3959);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/paginator */ 1211);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/sort */ 9696);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/grid-list */ 5409);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/menu */ 9872);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/tree */ 7909);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 4744);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/dialog */ 6298);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/stepper */ 1792);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);









//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// RECOMMENDED

// or
//import { ModalModule } from 'ngx-bootstrap';

//import { DireccionFormComponent } from './modules/administracion/inmuebles/direccion-form/direccion-form.component';






//import { NavBarComponent } from './modules/nav-bar/nav-bar.component';





//import { TableComponent } from './modules/table/table.component';



//import { DashboardComponent } from './modules/dashboard/dashboard.component';


//import { TreeComponent } from './modules/tree/tree.component';

//import { DargAndDropComponent } from './modules/darg-and-drop/darg-and-drop.component';





//import { BuscarInmueblesComponent } from './modulos/adminsitracion/inmuebles/buscar-inmuebles/buscar-inmuebles.component';
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule,
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__.ModalModule.forRoot(),
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__.MatSliderModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInputModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule,
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_16__.MatCardModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule,
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_18__.LayoutModule,
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__.MatToolbarModule,
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_20__.MatSidenavModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__.MatIconModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_22__.MatListModule,
            _angular_material_table__WEBPACK_IMPORTED_MODULE_23__.MatTableModule,
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_24__.MatPaginatorModule,
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__.MatSortModule,
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_26__.MatGridListModule,
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__.MatMenuModule,
            _angular_material_tree__WEBPACK_IMPORTED_MODULE_28__.MatTreeModule,
            _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__.DragDropModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__.MatDialogModule,
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_31__.MatStepperModule,
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__.MatToolbarModule,
            _angular_material_tree__WEBPACK_IMPORTED_MODULE_28__.MatTreeModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__.MatIconModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _plantilla_barra_navegacion_barra_navegacion_component__WEBPACK_IMPORTED_MODULE_2__.BarraNavegacionComponent,
        _plantilla_pie_pagina_pie_pagina_component__WEBPACK_IMPORTED_MODULE_3__.PiePaginaComponent,
        _plantilla_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_4__.InicioComponent,
        _plantilla_error_error_component__WEBPACK_IMPORTED_MODULE_5__.ErrorComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule, ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_10__.ModalModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_11__.MatSliderModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInputModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_15__.MatRadioModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_16__.MatCardModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule,
        _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_18__.LayoutModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__.MatToolbarModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_20__.MatSidenavModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__.MatIconModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_22__.MatListModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_23__.MatTableModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_24__.MatPaginatorModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_25__.MatSortModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_26__.MatGridListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_27__.MatMenuModule,
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_28__.MatTreeModule,
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_29__.DragDropModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__.MatDialogModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_31__.MatStepperModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_19__.MatToolbarModule,
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_28__.MatTreeModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__.MatIconModule] }); })();


/***/ }),

/***/ 91:
/*!***********************************************!*\
  !*** ./src/app/modelos/identificar.modelo.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModeloIdentificar": () => (/* binding */ ModeloIdentificar)
/* harmony export */ });
class ModeloIdentificar {
    constructor() {
        this.estaIdentificado = false;
    }
}


/***/ }),

/***/ 8008:
/*!**************************************************************************!*\
  !*** ./src/app/plantilla/barra-navegacion/barra-navegacion.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BarraNavegacionComponent": () => (/* binding */ BarraNavegacionComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1620);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var src_app_servicios_seguridad_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/servicios/seguridad.service */ 1059);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ 7727);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 7752);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 8852);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/menu */ 9872);









function BarraNavegacionComponent_label_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u00A1Bienvenid@! ", ctx_r0.elNombre, "");
} }
function BarraNavegacionComponent_button_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "group");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function BarraNavegacionComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "group_add");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function BarraNavegacionComponent_button_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matMenuTriggerFor", _r4);
} }
function BarraNavegacionComponent_button_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "exit_to_app");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class BarraNavegacionComponent {
    /**
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    */
    constructor(seguridadServicio) {
        this.seguridadServicio = seguridadServicio;
        this.seInicioSesion = false;
        //isChecked = true;
        this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
        this.elNombre = "";
    }
    ngOnInit() {
        this.subs = this.seguridadServicio.ObtenerDatosUsuarioEnSesion()
            .subscribe((datos) => {
            var _a, _b;
            this.seInicioSesion = datos.estaIdentificado;
            //alert(JSON.stringify(datos, null, 2));
            this.elNombre = ((_a = datos === null || datos === void 0 ? void 0 : datos.datos) === null || _a === void 0 ? void 0 : _a.nombres) + " " + ((_b = datos === null || datos === void 0 ? void 0 : datos.datos) === null || _b === void 0 ? void 0 : _b.apellidos);
        });
    }
}
BarraNavegacionComponent.ɵfac = function BarraNavegacionComponent_Factory(t) { return new (t || BarraNavegacionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_servicios_seguridad_service__WEBPACK_IMPORTED_MODULE_0__.SeguridadService)); };
BarraNavegacionComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BarraNavegacionComponent, selectors: [["app-barra-navegacion"]], decls: 24, vars: 5, consts: [["color", "primary"], ["mat-icon-button", "", "routerLink", "inicio", "aria-label", "Icon company", 1, "example-icon"], [1, "example-spacer"], [4, "ngIf"], ["mat-icon-button", "", "routerLink", "/seguridad/identificar", "class", "example-icon favorite-icon", "aria-label", "Iniciar sesi\u00F3n", 4, "ngIf"], ["mat-icon-button", "", "routerLink", "/administracion/clientes/crear-cliente", "class", "example-icon favorite-icon", "aria-label", "Registrarse como cliente", 4, "ngIf"], ["mat-icon-button", "", 3, "matMenuTriggerFor", 4, "ngIf"], ["appMenu", "matMenu"], ["mat-menu-item", "", "routerLink", "/administracion/listar-inmuebles"], ["mat-menu-item", "", "routerLink", "/solicitudes/listar-solicitudes"], ["mat-icon-button", "", "routerLink", "/seguridad/cerrarSesion", "class", "example-icon favorite-icon", "aria-label", "Cerrar sesi\u00F3n", 4, "ngIf"], ["mat-icon-button", "", "routerLink", "/seguridad/identificar", "aria-label", "Iniciar sesi\u00F3n", 1, "example-icon", "favorite-icon"], ["mat-icon-button", "", "routerLink", "/administracion/clientes/crear-cliente", "aria-label", "Registrarse como cliente", 1, "example-icon", "favorite-icon"], ["mat-icon-button", "", 3, "matMenuTriggerFor"], ["mat-icon-button", "", "routerLink", "/seguridad/cerrarSesion", "aria-label", "Cerrar sesi\u00F3n", 1, "example-icon", "favorite-icon"]], template: function BarraNavegacionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-toolbar-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "star_half");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Hogar Colombia");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, BarraNavegacionComponent_label_9_Template, 4, 1, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-toolbar-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "\u00A1Haz tus sue\u00F1os realidad!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, BarraNavegacionComponent_button_14_Template, 3, 0, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, BarraNavegacionComponent_button_15_Template, 3, 0, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, BarraNavegacionComponent_button_16_Template, 3, 1, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-menu", null, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Inmuebles");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Solicitudes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, BarraNavegacionComponent_button_23_Template, 3, 0, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.seInicioSesion);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.seInicioSesion);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.seInicioSesion);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.seInicioSesion);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.seInicioSesion);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__.MatToolbarRow, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__.MatMenuTrigger], styles: [".example-spacer[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n  }\n\n.mat-toolbar.mat-primary[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n\n.example-form[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%] {\n  margin: 8px 0;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcnJhLW5hdmVnYWNpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGNBQWM7RUFDaEI7O0FBRUY7RUFDRSxnQkFBZ0I7RUFDaEIsTUFBTTtFQUNOLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0FBQ2hCIiwiZmlsZSI6ImJhcnJhLW5hdmVnYWNpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLXNwYWNlciB7XG4gICAgZmxleDogMSAxIGF1dG87XG4gIH1cblxuLm1hdC10b29sYmFyLm1hdC1wcmltYXJ5IHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgdG9wOiAwO1xuICB6LWluZGV4OiAxO1xufVxuXG4uZXhhbXBsZS1mb3JtIG1hdC1zbGlkZS10b2dnbGUge1xuICBtYXJnaW46IDhweCAwO1xuICBkaXNwbGF5OiBibG9jaztcbn0iXX0= */"] });


/***/ }),

/***/ 1017:
/*!****************************************************!*\
  !*** ./src/app/plantilla/error/error.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorComponent": () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);

class ErrorComponent {
    constructor() { }
    ngOnInit() {
    }
}
ErrorComponent.ɵfac = function ErrorComponent_Factory(t) { return new (t || ErrorComponent)(); };
ErrorComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ErrorComponent, selectors: [["app-error"]], decls: 2, vars: 0, template: function ErrorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Esta ruta noexiste!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlcnJvci5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 8153:
/*!******************************************************!*\
  !*** ./src/app/plantilla/inicio/inicio.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InicioComponent": () => (/* binding */ InicioComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 8346);


class InicioComponent {
    constructor() {
        this.showFiller = false;
    }
    ngOnInit() {
    }
}
InicioComponent.ɵfac = function InicioComponent_Factory(t) { return new (t || InicioComponent)(); };
InicioComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InicioComponent, selectors: [["app-inicio"]], decls: 150, vars: 0, consts: [[1, "container-fluid", "p-5", "bg-primary", "text-white", "text-center"], [1, "container", "mt-5"], [1, "row"], [1, "col-sm-6"], [1, "carousel"], ["href", "#one!", 1, "carousel-item"], ["src", "https://i.ibb.co/bRwW8c3/imag1.jpg", "alt", "imag1", "border", "0"], ["href", "#two!", 1, "carousel-item"], ["src", "https://i.ibb.co/kSnRgKr/imag2.jpg", "alt", "imag2", "border", "0"], ["href", "#three!", 1, "carousel-item"], ["src", "https://i.ibb.co/2tTMfHq/imag3.jpg", "alt", "imag3", "border", "0"], [1, "carousel", "carousel-slider", "center"], [1, "carousel-fixed-item", "center"], [1, "btn", "waves-effect", "white", "grey-text", "darken-text-2"], ["href", "#one!", 1, "carousel-item", "red", "white-text"], [1, "black-text"], ["href", "#two!", 1, "carousel-item", "amber", "white-text"], ["href", "#three!", 1, "carousel-item", "green", "white-text"], ["href", "#four!", 1, "carousel-item", "blue", "white-text"], ["id", "contact", 1, "page-footer", "grey", "darken-3", 2, "margin-top", "0px", "padding-left", "0px"], [1, "container"], [1, "col", "l6", "s12"], [1, "white-text"], [1, "col", "s12"], ["onclick", "$crisp.push(['do', 'chat:open'])", 1, "btn", "waves-effect", "waves-light", "white", "light-green-text", "text-darken-2"], [1, "mdi", "mdi-message-text", "right", "text-darken-2"], ["id", "contactForm", "onsubmit", "return false;", 1, "col", "s12"], [1, "input-field", "col", "s12"], [1, "mdi", "mdi-email", "prefix", "white-text"], ["id", "email", "name", "email", "type", "email", 1, "validate", "white-text", "valid"], ["for", "email", 1, "white-text", "active"], [1, "mdi", "mdi-pencil", "prefix", "white-text"], ["id", "message", "name", "message", 1, "materialize-textarea", "white-text", 2, "padding-bottom", "0px", "height", "23px"], ["for", "message", 1, "white-text", "active"], [1, "col", "offset-s7", "s5"], ["type", "submit", "onclick", "sendEmailViaChat();", 1, "btn", "waves-effect", "waves-light", "white", "light-green-text", "text-darken-2", "right"], [1, "mdi", "mdi-send", "right", "text-darken-2"], [1, "col", "offset-l2", "l4", "s12", 2, "text-align", "right"], ["href", "https://www.android-kiosk.com/contact-us/"], ["href", "javascript:$crisp.push(['do', 'chat:open']);", 1, "white-text"], ["href", "https://play.google.com/store/apps/details?id=com.procoit.kioskbrowser"], ["alt", "Get it on Google Play", "src", "https://www.android-kiosk.com/wp-content/themes/androidkioskcom/images/google-play-badge.png", "width", "128"], [1, "small", "mdi", "mdi-email", "right", 2, "color", "white", "margin-top", "10px"], ["href", "https://www.youtube.com/channel/UCIRzVcBrPTMfCDYQfZJhm6A", "target", "_blank"], [1, "small", "mdi", "mdi-youtube-play", "right", 2, "color", "white", "margin-top", "10px"], ["href", "https://twitter.com/kiosk_browser", "target", "_blank"], [1, "small", "mdi", "mdi-twitter", "right", 2, "color", "white", "margin-top", "10px"], [1, "white-text", "right", 2, "font-size", "0.7em", "clear", "both"], [1, "footer-copyright"], ["href", "http://www.proco-it.com", "target", "_blank", 1, "white-text"], ["href", "https://www.android-kiosk.com/privacy/", "title", "Privacy Policy", 1, "white-text", "right"], ["action", "action_page.php"], ["for", "email"], ["type", "text", "placeholder", "Enter Email", "name", "email", "id", "email", "required", ""], ["for", "psw"], ["type", "password", "placeholder", "Enter Password", "name", "psw", "id", "psw", "required", ""], ["for", "psw-repeat"], ["type", "password", "placeholder", "Repeat Password", "name", "psw-repeat", "id", "psw-repeat", "required", ""], ["href", "#"], ["type", "submit", 1, "registerbtn"], [1, "container", "signin"]], template: function InicioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Hogar Colombia");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Descripci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Lorem ipsum dolor sit amet, consectetur adipisicing elit...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Misi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Lorem ipsum dolor sit amet, consectetur adipisicing elit...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Visi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Lorem ipsum dolor sit amet, consectetur adipisicing elit...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "button");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "First Panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "This is your first panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Second Panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "p", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "This is your second panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Third Panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "p", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "This is your third panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Fourth Panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "p", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "This is your fourth panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "footer", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "h5", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Get in touch");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, " Chat with us ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "i", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "form", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "i", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "label", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "i", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](76, "textarea", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "Message");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "button", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "Send ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "i", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "a", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "h5", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "Contact");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "ProCo IT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "Unit 3 Castle Road, Chelston Business Park, Wellington, Somerset, TA21 9JQ, UK");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "a", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "support@android-kiosk.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "a", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "img", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "a", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "i", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "a", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "i", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "a", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "i", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "span", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "Android, Google Play and the Google Play logo are trademarks of Google Inc.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, "\u00A9 2020 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "a", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](113, "ProCo IT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "a", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, "Privacy & Cookies Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "form", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](120, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, "Please fill in this form to create an account.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "label", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](126, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "input", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "label", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](130, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](131, "input", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "label", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](134, "Repeat Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](135, "input", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](136, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](137, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, "By creating an account you agree to our ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "a", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](140, "Terms & Privacy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](141, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "button", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](143, "Register");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](146, "Already have an account? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](147, "a", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](148, "Sign in");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](149, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup], styles: [".example-container[_ngcontent-%COMP%] {\n    width: 500px;\n    height: 300px;\n    border: 1px solid rgba(0, 0, 0, 0.5);\n  }\n  \n  *[_ngcontent-%COMP%] {box-sizing: border-box}\n  \n  \n  \n  .container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  \n  \n  \n  input[type=text][_ngcontent-%COMP%], input[type=password][_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 15px;\n    margin: 5px 0 22px 0;\n    display: inline-block;\n    border: none;\n    background: #f1f1f1;\n  }\n  \n  input[type=text][_ngcontent-%COMP%]:focus, input[type=password][_ngcontent-%COMP%]:focus {\n    background-color: #ddd;\n    outline: none;\n  }\n  \n  \n  \n  hr[_ngcontent-%COMP%] {\n    border: 1px solid #f1f1f1;\n    margin-bottom: 25px;\n  }\n  \n  \n  \n  .registerbtn[_ngcontent-%COMP%] {\n    background-color: #04AA6D;\n    color: white;\n    padding: 16px 20px;\n    margin: 8px 0;\n    border: none;\n    cursor: pointer;\n    width: 100%;\n    opacity: 0.9;\n  }\n  \n  .registerbtn[_ngcontent-%COMP%]:hover {\n    opacity:1;\n  }\n  \n  \n  \n  a[_ngcontent-%COMP%] {\n    color: dodgerblue;\n  }\n  \n  \n  \n  .signin[_ngcontent-%COMP%] {\n    background-color: #f1f1f1;\n    text-align: center;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaWNpby5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixvQ0FBb0M7RUFDdEM7O0VBRUEsR0FBRyxzQkFBc0I7O0VBRXpCLDhCQUE4Qjs7RUFDOUI7SUFDRSxhQUFhO0VBQ2Y7O0VBRUEsNEJBQTRCOztFQUM1QjtJQUNFLFdBQVc7SUFDWCxhQUFhO0lBQ2Isb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGFBQWE7RUFDZjs7RUFFQSxtQ0FBbUM7O0VBQ25DO0lBQ0UseUJBQXlCO0lBQ3pCLG1CQUFtQjtFQUNyQjs7RUFFQSwrQ0FBK0M7O0VBQy9DO0lBQ0UseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLFlBQVk7SUFDWixlQUFlO0lBQ2YsV0FBVztJQUNYLFlBQVk7RUFDZDs7RUFFQTtJQUNFLFNBQVM7RUFDWDs7RUFFQSxtQ0FBbUM7O0VBQ25DO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBLDZFQUE2RTs7RUFDN0U7SUFDRSx5QkFBeUI7SUFDekIsa0JBQWtCO0VBQ3BCIiwiZmlsZSI6ImluaWNpby5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtY29udGFpbmVyIHtcbiAgICB3aWR0aDogNTAwcHg7XG4gICAgaGVpZ2h0OiAzMDBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIH1cbiAgXG4gICoge2JveC1zaXppbmc6IGJvcmRlci1ib3h9XG5cbiAgLyogQWRkIHBhZGRpbmcgdG8gY29udGFpbmVycyAqL1xuICAuY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICB9XG4gIFxuICAvKiBGdWxsLXdpZHRoIGlucHV0IGZpZWxkcyAqL1xuICBpbnB1dFt0eXBlPXRleHRdLCBpbnB1dFt0eXBlPXBhc3N3b3JkXSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMTVweDtcbiAgICBtYXJnaW46IDVweCAwIDIycHggMDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6ICNmMWYxZjE7XG4gIH1cbiAgXG4gIGlucHV0W3R5cGU9dGV4dF06Zm9jdXMsIGlucHV0W3R5cGU9cGFzc3dvcmRdOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cbiAgXG4gIC8qIE92ZXJ3cml0ZSBkZWZhdWx0IHN0eWxlcyBvZiBociAqL1xuICBociB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2YxZjFmMTtcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICB9XG4gIFxuICAvKiBTZXQgYSBzdHlsZSBmb3IgdGhlIHN1Ym1pdC9yZWdpc3RlciBidXR0b24gKi9cbiAgLnJlZ2lzdGVyYnRuIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDRBQTZEO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBwYWRkaW5nOiAxNnB4IDIwcHg7XG4gICAgbWFyZ2luOiA4cHggMDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG9wYWNpdHk6IDAuOTtcbiAgfVxuICBcbiAgLnJlZ2lzdGVyYnRuOmhvdmVyIHtcbiAgICBvcGFjaXR5OjE7XG4gIH1cbiAgXG4gIC8qIEFkZCBhIGJsdWUgdGV4dCBjb2xvciB0byBsaW5rcyAqL1xuICBhIHtcbiAgICBjb2xvcjogZG9kZ2VyYmx1ZTtcbiAgfVxuICBcbiAgLyogU2V0IGEgZ3JleSBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBjZW50ZXIgdGhlIHRleHQgb2YgdGhlIFwic2lnbiBpblwiIHNlY3Rpb24gKi9cbiAgLnNpZ25pbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH0iXX0= */"] });


/***/ }),

/***/ 1398:
/*!**************************************************************!*\
  !*** ./src/app/plantilla/pie-pagina/pie-pagina.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PiePaginaComponent": () => (/* binding */ PiePaginaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/toolbar */ 7727);


class PiePaginaComponent {
    constructor() { }
    ngOnInit() {
    }
}
PiePaginaComponent.ɵfac = function PiePaginaComponent_Factory(t) { return new (t || PiePaginaComponent)(); };
PiePaginaComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PiePaginaComponent, selectors: [["app-pie-pagina"]], decls: 1, vars: 0, consts: [["color", "primary"]], template: function PiePaginaComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-toolbar", 0);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__.MatToolbar], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwaWUtcGFnaW5hLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 1059:
/*!************************************************!*\
  !*** ./src/app/servicios/seguridad.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SeguridadService": () => (/* binding */ SeguridadService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var _modelos_identificar_modelo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modelos/identificar.modelo */ 91);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);





class SeguridadService {
    constructor(http) {
        this.http = http;
        this.url = 'http://localhost:3000';
        this.datosUsuarioEnSesion = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(new _modelos_identificar_modelo__WEBPACK_IMPORTED_MODULE_0__.ModeloIdentificar());
        this.VerificarSesionActual();
    }
    VerificarSesionActual() {
        let datos = this.ObtenerInformacionSesion();
        if (datos) {
            this.RefrescarDatosSesion(datos);
        }
    }
    RefrescarDatosSesion(datos) {
        this.datosUsuarioEnSesion.next(datos);
    }
    ObtenerDatosUsuarioEnSesion() {
        return this.datosUsuarioEnSesion.asObservable();
    }
    IdentificarPersona(usuario, clave) {
        let res = this.http.post(`${this.url}/identificarPersona`, {
            usuario: usuario,
            clave: clave
        }, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        });
        console.log(res);
        return res;
    }
    AlmacenarSesion(datos) {
        datos.estaIdentificado = true;
        let stringDatos = JSON.stringify(datos);
        localStorage.setItem("datosSesion", stringDatos);
        this.RefrescarDatosSesion(datos);
    }
    ObtenerInformacionSesion() {
        let datosString = localStorage.getItem("datosSesion");
        if (datosString) {
            let datos = JSON.parse(datosString);
            return datos;
        }
        else {
            return null;
        }
    }
    EliminarInformacionSesion() {
        localStorage.removeItem("datosSesion");
        this.RefrescarDatosSesion(new _modelos_identificar_modelo__WEBPACK_IMPORTED_MODULE_0__.ModeloIdentificar());
    }
    SeHaIniciadoSesion() {
        let datosString = localStorage.getItem("datosSesion");
        return datosString;
    }
    RecuperarClave(usuario) {
        let res = this.http.patch(`${this.url}/recuperarClave`, {
            usuario: usuario,
            clave: ""
        }, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        });
        console.log(res);
        return res;
    }
    ObtenerToken() {
        let datosString = localStorage.getItem("datosSesion");
        if (datosString) {
            let datos = JSON.parse(datosString);
            return datos.tk;
        }
        else {
            return '';
        }
    }
}
SeguridadService.ɵfac = function SeguridadService_Factory(t) { return new (t || SeguridadService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
SeguridadService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: SeguridadService, factory: SeguridadService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8260:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 271:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _angular_compiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/compiler */ 3396);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ 4750);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ 8260);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(1111), __webpack_exec__(271)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map