import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(private activatedRoute: ActivatedRoute, private countriesService: CountriesService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id) )
    ).subscribe( country => {
      if (!country) return this.router.navigateByUrl('');

      return this.country = country;
    });
  }

}
