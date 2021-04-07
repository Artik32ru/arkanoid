var Controller = function (View, Model) {
    this.arkanoidView = View;
    this.arkanoidModel = Model;
};

Controller.prototype.init = function () {
    this.arkanoidView.onKeyDownEvent = this.keydown.bind(this);
    this.arkanoidView.onMouseMoveEvent = this.mousemoving.bind(this);
    this.arkanoidModel.init(this.needRendering.bind(this));
    this.arkanoidView.init(arkanoidModel.objs);
    this.needRendering();
};

Controller.prototype.keydown = function (e) {
    if (e.keyCode == KEY_CODE_ESC) {
        this.arkanoidModel.build();
        this.arkanoidView.init(arkanoidModel.objs);
        this.needRendering();
    }
    else
        this.arkanoidModel.OnKeyDown(e);

};

Controller.prototype.mousemoving = function (e) {
    this.arkanoidModel.platformMove(e);
};

Controller.prototype.needRendering = function () {
    this.arkanoidView.render(arkanoidModel.objs);
};

var arkanoidController = new Controller(arkanoidView, arkanoidModel);

arkanoidController.init();