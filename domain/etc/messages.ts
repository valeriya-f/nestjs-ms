import { I18nContext } from "nestjs-i18n";

export const EnumErrorMessage = () => {
    const i18n = I18nContext.current();
    return i18n.t("errors.invalid-field.should-be-enum");
};

export const StringErrorMessage = () => {
    const i18n = I18nContext.current();
    return i18n.t("errors.invalid-field.should-be-string");
};

export const ArrayErrorMessage = () => {
    const i18n = I18nContext.current();
    return i18n.t("errors.invalid-field.should-be-array");
};

export const BooleanErrorMessage = () => {
    const i18n = I18nContext.current();
    return i18n.t("errors.invalid-field.should-be-boolean");
};

export const NestedErrorMessage = () => {
    const i18n = I18nContext.current();
    return i18n.t("errors.invalid-field.should-have-value");
};