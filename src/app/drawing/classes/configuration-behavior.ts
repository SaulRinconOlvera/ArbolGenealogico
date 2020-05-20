import { DrawConfiguration } from './draw-configuration';

export class ConfigurationBehavior {
    private defaultConfiguration: DrawConfiguration;
    private higlightConfiguration: DrawConfiguration;
    private selectedConfiguration: DrawConfiguration;

    constructor (defaultConfiguration: DrawConfiguration, 
        higlightConfiguration: DrawConfiguration, 
        selectedConfiguration: DrawConfiguration)
    {
        this.higlightConfiguration = higlightConfiguration;
        this.defaultConfiguration = defaultConfiguration;
        this.selectedConfiguration = selectedConfiguration;
    }

    public getDefaultConfiguration = () : DrawConfiguration => this.defaultConfiguration;
    public getHiglightConfiguration = () : DrawConfiguration => this.higlightConfiguration;
    public getSelectedConfiguration = () : DrawConfiguration => this.selectedConfiguration;
}