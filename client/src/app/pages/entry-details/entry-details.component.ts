import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/api/dto/tag.dto';
import { TravelEntry } from 'src/app/api/dto/travelentry.dto';
import { EntryService } from 'src/app/api/service/entry.service';
import { TagService } from 'src/app/api/service/tag.service';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
    selector: 'app-entry-details',
    templateUrl: './entry-details.component.html',
    styleUrls: ['./entry-details.component.scss'],
})
export class EntryDetailsComponent implements OnInit, AfterViewInit {
    @Input()
    selectedEntry: TravelEntry;

    tags: Array<Tag>;
    chipCtrl = new FormControl();
    toggleInProgress = false;

    private map: L.Map;
    @ViewChild('map')
    private mapContainer: ElementRef<HTMLElement>;

    constructor(private entryService: EntryService, private tagService: TagService) {}

    async ngOnInit(): Promise<void> {
        this.tags = await this.tagService.findAll();
    }
    async toggleTag(tag: Tag): Promise<void> {
        this.chipCtrl.disable();
        await this.entryService.toggleTag(this.selectedEntry.id, tag);
        await this.updateEntry();
        this.tags = await this.tagService.findAll();
        this.chipCtrl.enable();
    }

    async selected(event: MatChipInputEvent): Promise<void> {
        this.toggleInProgress = true;
        await this.toggleTag(this.chipCtrl.value);
        this.toggleInProgress = false;
    }

    add(event: MatChipInputEvent): void {
        if (this.toggleInProgress) {
            return;
        }
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.toggleTag((value as any) as Tag);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.chipCtrl.setValue(null);
    }

    async updateEntry(): Promise<void> {
        this.selectedEntry = await this.entryService.get(this.selectedEntry.id);
    }
    ngAfterViewInit(): void {
        const myAPIKey = "86c062c225634067950f21ae707df0a3";
        const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

        const [lat,lon] = this.selectedEntry.latlon.split(',');
        const initialState = {
          lng:Number.parseInt(lon),
          lat:Number.parseInt(lat),
          zoom: 12
        };

        const map = new L.Map(this.mapContainer.nativeElement).setView(
          [initialState.lat,initialState.lng],
          initialState.zoom
        );

        // the attribution is required for the Geoapify Free tariff plan
        map.attributionControl
          .setPrefix("")
          .addAttribution(
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
          );

        L.mapboxGL({
          style: `${mapStyle}?apiKey=${myAPIKey}`,
          accessToken: "pk.eyJ1IjoibWF0eWkiLCJhIjoiY2swYmY2czdrMHJsODNkcGpmYjdzNTRpcyJ9.61rtkfZWeDhwGysd8GYbGQ"
        }).addTo(map);

        const marker = new L.Marker([initialState.lat,initialState.lng],{
            title: this.selectedEntry.desc,
            icon: new L.Icon({
                iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
            })
        }).addTo(map);
        marker.bindPopup(this.selectedEntry.desc).openPopup();
    }


}
