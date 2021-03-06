System.register(["rtts_assert/rtts_assert", "angular2/angular2", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "./model", "./validators"], function($__export) {
  "use strict";
  var assert,
      View,
      Component,
      Decorator,
      Ancestor,
      onChange,
      PropertySetter,
      Optional,
      isBlank,
      isPresent,
      isString,
      CONST,
      StringMapWrapper,
      ListWrapper,
      ControlGroup,
      Control,
      Validators,
      DefaultValueAccessor,
      CheckboxControlValueAccessor,
      ControlDirective,
      ControlGroupDirective,
      FormDirectives;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      View = $__m.View;
      Component = $__m.Component;
      Decorator = $__m.Decorator;
      Ancestor = $__m.Ancestor;
      onChange = $__m.onChange;
      PropertySetter = $__m.PropertySetter;
    }, function($__m) {
      Optional = $__m.Optional;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      isString = $__m.isString;
      CONST = $__m.CONST;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ControlGroup = $__m.ControlGroup;
      Control = $__m.Control;
    }, function($__m) {
      Validators = $__m.Validators;
    }],
    execute: function() {
      DefaultValueAccessor = $__export("DefaultValueAccessor", (function() {
        var DefaultValueAccessor = function DefaultValueAccessor(setValueProperty) {
          assert.argumentTypes(setValueProperty, Function);
          this._setValueProperty = setValueProperty;
          this.onChange = (function(_) {});
        };
        return ($traceurRuntime.createClass)(DefaultValueAccessor, {writeValue: function(value) {
            this._setValueProperty(value);
          }}, {});
      }()));
      Object.defineProperty(DefaultValueAccessor, "annotations", {get: function() {
          return [new Decorator({
            selector: '[control]',
            hostListeners: {
              'change': 'onChange($event.target.value)',
              'input': 'onChange($event.target.value)'
            }
          })];
        }});
      Object.defineProperty(DefaultValueAccessor, "parameters", {get: function() {
          return [[Function, new PropertySetter('value')]];
        }});
      CheckboxControlValueAccessor = $__export("CheckboxControlValueAccessor", (function() {
        var CheckboxControlValueAccessor = function CheckboxControlValueAccessor(cd, setCheckedProperty) {
          assert.argumentTypes(cd, ControlDirective, setCheckedProperty, Function);
          this._setCheckedProperty = setCheckedProperty;
          this.onChange = (function(_) {});
          cd.valueAccessor = this;
        };
        return ($traceurRuntime.createClass)(CheckboxControlValueAccessor, {writeValue: function(value) {
            this._setCheckedProperty(value);
          }}, {});
      }()));
      Object.defineProperty(CheckboxControlValueAccessor, "annotations", {get: function() {
          return [new Decorator({
            selector: 'input[type=checkbox][control]',
            hostListeners: {'change': 'onChange($event.target.checked)'}
          })];
        }});
      Object.defineProperty(CheckboxControlValueAccessor, "parameters", {get: function() {
          return [[ControlDirective], [Function, new PropertySetter('checked')]];
        }});
      ControlDirective = $__export("ControlDirective", (function() {
        var ControlDirective = function ControlDirective(groupDirective, valueAccessor) {
          assert.argumentTypes(groupDirective, ControlGroupDirective, valueAccessor, DefaultValueAccessor);
          this._groupDirective = groupDirective;
          this.controlOrName = null;
          this.valueAccessor = valueAccessor;
          this.validator = Validators.nullValidator;
        };
        return ($traceurRuntime.createClass)(ControlDirective, {
          onChange: function(_) {
            this._initialize();
          },
          _initialize: function() {
            if (isPresent(this._groupDirective)) {
              this._groupDirective.addDirective(this);
            }
            var c = this._control();
            c.validator = Validators.compose([c.validator, this.validator]);
            this._updateDomValue();
            this._setUpUpdateControlValue();
          },
          _updateDomValue: function() {
            this.valueAccessor.writeValue(this._control().value);
          },
          _setUpUpdateControlValue: function() {
            var $__0 = this;
            this.valueAccessor.onChange = (function(newValue) {
              return $__0._control().updateValue(newValue);
            });
          },
          _control: function() {
            if (isString(this.controlOrName)) {
              return this._groupDirective.findControl(this.controlOrName);
            } else {
              return this.controlOrName;
            }
          }
        }, {});
      }()));
      Object.defineProperty(ControlDirective, "annotations", {get: function() {
          return [new Decorator({
            lifecycle: [onChange],
            selector: '[control]',
            properties: {'controlOrName': 'control'}
          })];
        }});
      Object.defineProperty(ControlDirective, "parameters", {get: function() {
          return [[ControlGroupDirective, new Optional(), new Ancestor()], [DefaultValueAccessor]];
        }});
      ControlGroupDirective = $__export("ControlGroupDirective", (function() {
        var ControlGroupDirective = function ControlGroupDirective(groupDirective) {
          assert.argumentTypes(groupDirective, ControlGroupDirective);
          this._groupDirective = groupDirective;
          this._directives = ListWrapper.create();
        };
        return ($traceurRuntime.createClass)(ControlGroupDirective, {
          set controlGroup(controlGroup) {
            if (isString(controlGroup)) {
              this._controlGroupName = controlGroup;
            } else {
              this._controlGroup = controlGroup;
            }
            this._updateDomValue();
          },
          _updateDomValue: function() {
            ListWrapper.forEach(this._directives, (function(cd) {
              return cd._updateDomValue();
            }));
          },
          addDirective: function(c) {
            assert.argumentTypes(c, ControlDirective);
            ListWrapper.push(this._directives, c);
          },
          findControl: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return assert.returnType((this._getControlGroup().controls[name]), assert.type.any);
          },
          _getControlGroup: function() {
            if (isPresent(this._controlGroupName)) {
              return assert.returnType((this._groupDirective.findControl(this._controlGroupName)), ControlGroup);
            } else {
              return assert.returnType((this._controlGroup), ControlGroup);
            }
          }
        }, {});
      }()));
      Object.defineProperty(ControlGroupDirective, "annotations", {get: function() {
          return [new Decorator({
            selector: '[control-group]',
            properties: {'controlGroup': 'control-group'}
          })];
        }});
      Object.defineProperty(ControlGroupDirective, "parameters", {get: function() {
          return [[ControlGroupDirective, new Optional(), new Ancestor()]];
        }});
      Object.defineProperty(ControlGroupDirective.prototype.addDirective, "parameters", {get: function() {
          return [[ControlDirective]];
        }});
      Object.defineProperty(ControlGroupDirective.prototype.findControl, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      FormDirectives = $__export("FormDirectives", [ControlGroupDirective, ControlDirective, CheckboxControlValueAccessor, DefaultValueAccessor]);
    }
  };
});
//# sourceMappingURL=directives.es6.map

//# sourceMappingURL=./directives.js.map