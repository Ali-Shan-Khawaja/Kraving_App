import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/_services/menu.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  model: any = {};

  constructor(private route: ActivatedRoute, private menuService: MenuService) { }

  ngOnInit(): void {
  }

  addMenu() {
    this.model.restaurantID = this.route.snapshot.paramMap.get('id');
    this.menuService.addMenu(this.model)
      .subscribe(res => {
        console.log(res);
      });
  }

}
