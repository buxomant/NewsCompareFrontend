import * as ko from 'knockout';
import * as _ from 'lodash';
import {Promise} from 'q';
import * as networkClient from 'scripts/clients/network-client';
import {ItemsResponse} from 'scripts/models/response/items-response';
import {Item} from 'scripts/models/item';

export class ItemRepo {

    public static items: KnockoutObservableArray<Item> = ko.observableArray();

    public static init() {
        ItemRepo.fetchItems()
            .then((itemsResponse) => {
                const items: Item[] = _.map(itemsResponse.items, Item.fromResponse);
                ItemRepo.items(items);
            })
            .catch((error) => console.log(error)); // qq implement error handling
    }

    public static fetchItems(): Promise<ItemsResponse> {
        const endpointPath = `items`;
        return networkClient.makeGetRequest<ItemsResponse>(endpointPath);
    }
}