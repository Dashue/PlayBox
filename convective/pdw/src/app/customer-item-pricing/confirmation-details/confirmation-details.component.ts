import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CustomerConfirmationsService} from '../customer-confirmations.service';
import {ConfirmationItem} from '../../models/customer-item';
import {NavService} from '../../nav.service';

@Component({
  selector: 'hfc-confirmation-details',
  templateUrl: './confirmation-details.component.html',
  styleUrls: ['./confirmation-details.component.scss']
})
export class ConfirmationDetailsComponent implements OnInit {
  confirmationDetails: ConfirmationItem;
  customerDescription: string;
  itemNumber: string;
  itemDescription: string;
  effectiveDate: Date;
  errorMessage: string;
  requestInProgress: boolean = true;

  constructor(private route: ActivatedRoute,
              private customerConfirmationsService: CustomerConfirmationsService,
              navService: NavService) {
    navService.isBackEnabled = true;
    navService.title = 'Confirmation Details';
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.requestInProgress = true;
        this.errorMessage = undefined;
        this.confirmationDetails = undefined;
        return this.customerConfirmationsService.getConfirmationItemPricing(
          params.get('confirmationId'),
          params.get('itemKey'));
      })
      .subscribe((response: ConfirmationItem) => {
          this.requestInProgress = false;
          this.confirmationDetails = response;
        },
        (error) => {
          this.requestInProgress = false;
          this.errorMessage = error.error.error;
        });

    this.route.queryParamMap
      .subscribe((paramMap: ParamMap) => {
        this.customerDescription = paramMap.get('customerDescription');
        this.itemNumber = paramMap.get('itemNumber');
        this.itemDescription = paramMap.get('itemDescription');
        const effectiveDateString = paramMap.get('effectiveDate');
        if (effectiveDateString) {
          this.effectiveDate = new Date(effectiveDateString);
        }
      });
  }
}
