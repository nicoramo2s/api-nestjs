'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">final-project-bootcmap documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' :
                                            'id="xs-controllers-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' :
                                        'id="xs-injectables-links-module-AdminModule-6336c92b294e2b28b7af50cb515a17d24ca7a73d3cba19a92d6d75386d9374b55d472e5575b39ad87dea7378a091b1462ce91499d099c7686e9453ca9f753384"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' :
                                            'id="xs-controllers-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' :
                                        'id="xs-injectables-links-module-AuthModule-686a866803c03833519b0ccbdfb9401a36222bd913be6a992f448a33e9d0141e29cea74f8114c73cf6fadaa2b8ca2bec1dd3374a08684e521e9c13311e64622d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' :
                                            'id="xs-controllers-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' :
                                        'id="xs-injectables-links-module-PostsModule-94776a30cd4addd8e78b1b315a4d4116c586c3e623bdbc0931d76140cfeef6766360034f23f267f1a60fbd71e62746e7c19752b0d40831ac9e48172474982c2b"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' :
                                            'id="xs-controllers-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' :
                                        'id="xs-injectables-links-module-UsersModule-561a112fbd11790c58315b6cd8679dd37bbb9886ed291ffe83009d69c405d40fdc62888d7dc35cded2b1bbabaf6284cdf18a0279d9272fdc383aa228687a076e"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminController.html" data-type="entity-link" >AdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDTO.html" data-type="entity-link" >CreatePostDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link" >CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterPostsDto.html" data-type="entity-link" >FilterPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/Register.html" data-type="entity-link" >Register</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchPostsDto.html" data-type="entity-link" >SearchPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDTO.html" data-type="entity-link" >UpdatePostDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDTO.html" data-type="entity-link" >UpdateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRequest.html" data-type="entity-link" >UserRequest</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateToken.html" data-type="entity-link" >ValidateToken</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/PostRequest.html" data-type="entity-link" >PostRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPayload.html" data-type="entity-link" >UserPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});